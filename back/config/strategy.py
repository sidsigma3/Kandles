import pandas as pd
import pandas_ta as ta
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import numpy as np
from nsepython import *
import base64
from io import BytesIO
from json import JSONEncoder
from pandas import Timestamp

buf = BytesIO()
input_data = json.loads(sys.argv[1])

# stopLoss = 0.1
# target = 0.1
# symbol = 'SBIN'
# start_date= '01-01-2020'
# end_date = '01-01-2022'
# initial_capital = 100000000
# quantity = 50

# symbol =[
#     "ABB",
#     "ABCAPITAL",
# ]

stopLoss=input_data.get('pyStoploss')
target=input_data.get('pyTarget')
symbol = input_data.get('backSymbol')
start_date = input_data.get('startDate')
end_date = input_data.get('endDate')
initial_capital = input_data.get('backCapital')
quantity=input_data.get('backQuantity')
strategy_type = input_data.get('entryType')
graph_type = input_data.get('graphType')
trailing_sl=input_data.get('trailing')
default_output_selection = {
    'macd': 'line',  # Use the MACD signal line
    'macd-s':'signal' ,   
    'adx': 'main',     # Use the main ADX line
    'bollinger': 'middle',  # Use the middle Bollinger Band
    'stoch': 'stoch_d',     # Use the %D line of Stochastic
    'supertrend': 'trend',  # Use the main SuperTrend line
    'ichimoku': 'kijun_sen', # Use the Kijun-sen line of Ichimoku
    'ppo': 'ppo_line'  ,     # Use the main line of PPO
    
}

def get_output_column_name(indicator_name, params):
    if indicator_name in default_output_selection:
        output_key = default_output_selection[indicator_name]
        if indicator_name == 'macd':
            fast = params.get('fastPeriod', 12)
            slow = params.get('slowPeriod', 26)
            signal = params.get('signalPeriod', 9)
            outputs = {
                'line': f"MACD_{fast}_{slow}_{signal}",
                'hist': f"MACDh_{fast}_{slow}_{signal}",
                'signal': f"MACDs_{fast}_{slow}_{signal}"
            }

        elif indicator_name == 'macd-s':
            fast = params.get('fastPeriod', 12)
            slow = params.get('slowPeriod', 26)
            signal = params.get('signalPeriod', 9)
            outputs = {
                'line': f"MACD_{fast}_{slow}_{signal}",
                'hist': f"MACDh_{fast}_{slow}_{signal}",
                'signal': f"MACDs_{fast}_{slow}_{signal}"
            }   

        elif indicator_name == 'bollinger':
            period = params.get('period', 20)
            std_dev = params.get('stdDev', 2)
            outputs = {
                'upper': f"BBU_5_2.0",
                'middle': f"BBM_5_2.0",
                'lower': f"BBL_5_2.0"
            }

        elif indicator_name == 'stoch':
            k_period = params.get('kPeriod', 14)
            d_period = params.get('dPeriod', 3)
            outputs = {
                'stoch_k': f"STOCHk_14_3_3",
                'stoch_d': f"STOCHd_14_3_3"
            }

        elif indicator_name == 'adx':
            period = params.get('period', 14)
            outputs = {
                'main': f"ADX_{period}",
                'plus_di': f"DMP_{period}",
                'minus_di': f"DMN_{period}"
            }

        elif indicator_name == 'supertrend':
            period = params.get('period', 10)  # Default to 10 if not provided
            multiplier = params.get('multiplier', 3)  # Default to 3 if not provided
            outputs = {
                'trend': f"SUPERT_{period}_{multiplier}.0",
                'detail': f"SUPERTd_{period}_{multiplier}.0",
                'low': f"SUPERTl_{period}_{multiplier}.0",
                'signal': f"SUPERTs_{period}_{multiplier}.0"
            }
        return outputs[output_key]
    else:
        return f"{indicator_name.upper()}"  # Default to a generic name if not specified




indicator_data_requirements = {
    'adx': ['high', 'low', 'close'],
    'rsi': ['close'],
    'macd': ['close'],
    'macd-s':['close'],
    'stoch': ['high', 'low', 'close'],
    'vwap': ['high', 'low', 'close', 'volume'],
    'bollinger': ['close'],
    'parabolic_sar': ['high', 'low', 'close'],
    'ichimoku': ['high','low','close'],
    'psar':['high','low'],
    'atr':['high','low','close'],
    'cci':['high','low','close'],
    'supertrend':['high','low','close']
   
}


def map_params(indicator_name, user_params):
   
    param_mapping = {
        'rsi': {'period': 'length'},
        'macd': {'fastPeriod': 'fast', 'slowPeriod': 'slow', 'signalPeriod': 'signal'},
        'macd-s': {'fastPeriod': 'fast', 'slowPeriod': 'slow', 'signalPeriod': 'signal'},
        'stochastic': {'kPeriod': 'k', 'dPeriod': 'd', 'slowing': 'slow'},
        'bollinger': {'period': 'length', 'stdDev': 'std'},
        'parabolic_sar': {'step': 'accel', 'max': 'max_af'},
        'ema': {'period': 'length'},
        'sma': {'period': 'length'},
        'wma': {'period': 'length'},
        'tma': {'period': 'length'},  # Triangular Moving Average
        'cci': {'period': 'length'},  # Commodity Channel Index
        'atr': {'period': 'length'},  # Average True Range
        'adx': {'period': 'length'},  # Average Directional Index
        'obv': {},  # On-Balance Volume does not require additional parameters
        'vwap': {},  # VWAP typically does not take parameters, but might be configurable in some implementations
        'ichimoku': {'conversionLinePeriod': 'tenkan', 'baseLinePeriod': 'kijun', 'laggingSpan2Period': 'senkou_b', 'displacement': 'shift'},
        'stochrsi': {'period': 'length'},  # Stochastic RSI
        'williams': {'period': 'length'},  # Williams %R
        'keltner_channel': {'length': 'length', 'mult': 'scalar', 'offset': 'offset'},
        'ultimate_oscillator': {'short': 'timeperiod1', 'medium': 'timeperiod2', 'long': 'timeperiod3', 'ws': 'weight1', 'wm': 'weight2', 'wl': 'weight3'},
        'trix': {'length': 'length'},
        'apo': {'fast': 'fastperiod', 'slow': 'slowperiod'},
        'ppo': {'fast': 'fastperiod', 'slow': 'slowperiod', 'signal': 'signalperiod'},
        'mom': {'period': 'length'},
        'dmi': {'period': 'length'},  # DMI or ADX
        'bbwidth': {'period': 'length'},
        'supertrend': {'period': 'length', 'multiplier': 'multiplier'}, 
        'pivot_point': {'period': 'length'},  
        'rsi_ma': {'period': 'length', 'ma_period': 'ma_length'}, 
        'plus_di': {'period': 'length'}, 
        'minus_di': {'period': 'length'} 
    }

    # Get the specific mapping for the given indicator
    current_mapping = param_mapping.get(indicator_name, {})
    
    # Translate user parameter names to pandas_ta parameter names
    translated_params = {current_mapping.get(k, k): v for k, v in user_params.items()}

    return translated_params

# Assuming sbi_data is your DataFrame with stock data

# Calculate indicators as per the conditions
# indicator_one_period = int(input_data.get('indicatorDetails')['indicatorOne']['period'])
# indicator_two_period = int(input_data.get('indicatorDetails')['indicatorTwo']['period'])

# input_conditions = input_data.get('indicatorDetails')['comparator']

# indicator_one_details = input_data.get('indicatorDetails')['indicatorOne']
# indicator_two_details = input_data.get('indicatorDetails')['indicatorTwo']



trades = []  # Initialize a list to collect trades
total_pnl = 0  # Initialize total P&L

# symbol = "SBIN"
series = "EQ"
# start_date = "08-06-2021"
# end_date ="14-06-2022"

def suppress_print(func, *args, **kwargs):
    original_stdout = sys.stdout  # Save the original stdout
    sys.stdout = open(os.devnull, 'w')  # Redirect stdout to devnull
    result = func(*args, **kwargs)  # Call the function
    sys.stdout.close()
    sys.stdout = original_stdout  # Restore original stdout
   
    return result

def compute_heikin_ashi(data):
    heikin_ashi = pd.DataFrame(index=data.index)
    

    open_col = 'CH_OPENING_PRICE'
    high_col = 'CH_TRADE_HIGH_PRICE'
    low_col = 'CH_TRADE_LOW_PRICE'
    close_col = 'CH_CLOSING_PRICE'

  
    heikin_ashi[close_col] = (data[open_col] + data[high_col] + data[low_col] + data[close_col]) / 4
    heikin_ashi[open_col] = (heikin_ashi[close_col].shift(1) + heikin_ashi[close_col].shift(1)) / 2
    heikin_ashi[high_col] = data[[open_col, close_col, high_col]].max(axis=1)
    heikin_ashi[low_col] = data[[open_col, close_col, low_col]].min(axis=1)

  
    heikin_ashi[open_col].iloc[0] = data[open_col].iloc[0]
    heikin_ashi.fillna(method='backfill', inplace=True)  # Handle NaN values for HA_Open in the first row

    return heikin_ashi


def compute_monthly_pnl(trades):
    # Create DataFrame from trade dates and cumulative P&L
    # data = pd.DataFrame({
    #     'Trade Date': pd.to_datetime(trade_dates),
    #     'Cumulative PnL': cumulative_pnl
    # })
    # data.set_index('Trade Date', inplace=True)

    # # Compute monthly P&L by taking the difference of cumulative PnL
    # monthly_pnl = data['Cumulative PnL'].resample('M').last().diff().fillna(0)

    # # Reshape data into a pivot table format with years as rows and months as columns
    # monthly_pnl_df = monthly_pnl.reset_index()
    # monthly_pnl_df['Year'] = monthly_pnl_df['Trade Date'].dt.year
    # monthly_pnl_df['Month'] = monthly_pnl_df['Trade Date'].dt.strftime('%B')

    # # Pivot and reindex the table to have months in chronological order
    # pivot_table = monthly_pnl_df.pivot_table(values='Cumulative PnL', index='Year', columns='Month', aggfunc='sum', fill_value=0)
    # months_ordered = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    # pivot_table = pivot_table.reindex(columns=months_ordered)  # This ensures months are in the right order

    # # Add a total row at the end
    # pivot_table.loc['Total'] = pivot_table.sum()

    # return pivot_table
    trades_df = pd.DataFrame(trades)

    
    trades_with_pnl = trades_df[~trades_df['pnl'].isnull()]

  
    trade_dates = pd.to_datetime(trades_with_pnl['date'])
    pnl_values = trades_with_pnl['pnl']

   
    pnl_data = pd.DataFrame({'Trade Date': trade_dates, 'PnL': pnl_values})

   
    monthly_pnl = pnl_data.set_index('Trade Date').resample('M').sum()

   
    pivot_table = monthly_pnl.reset_index().pivot_table(values='PnL', index=monthly_pnl.index.year, columns=monthly_pnl.index.month_name(), aggfunc='sum', fill_value=0)

   
    pivot_table.loc['Total'] = pivot_table.sum()

    
    pivot_table['Total Yearly PnL'] = pivot_table.sum(axis=1)

   
    months_ordered = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    pivot_table = pivot_table.reindex(columns=months_ordered + ['Total Yearly PnL'])

    return pivot_table

def calculate_indicator(dataframe, indicator_details):
    indicator_name = indicator_details['value']
    
    temp_name=''

    if indicator_name == 'macd-s':
        temp_name = 'macd'

    user_inputs = indicator_details.get('indiInputs', {})
    params = indicator_details.get('indiInputs', {})
    
    # Map user inputs to the library-specific parameter names
    func_params = map_params(indicator_name, user_inputs)
    required_columns = indicator_data_requirements.get(indicator_name, ['close'])
    column_map = {
        'high': 'CH_TRADE_HIGH_PRICE',
        'low': 'CH_TRADE_LOW_PRICE',
        'open': 'CH_OPENING_PRICE',
        'close': 'CH_CLOSING_PRICE',
        'volume': 'CH_TOT_TRADED_VAL'
    }

    data_columns = {col: dataframe[column_map[col]] for col in required_columns if col in column_map}

    if indicator_name == 'close':
        price_series = dataframe['CH_CLOSING_PRICE'].shift(-(indicator_details['indiInputs']['offset']))  
        return price_series
       

    elif indicator_name == 'open':
        price_series = dataframe['CH_OPENING_PRICE'].shift(-(indicator_details['indiInputs']['offset']))  
        return price_series
       
    
    elif indicator_name == 'high':
        price_series = dataframe['CH_TRADE_HIGH_PRICE'].shift(-(indicator_details['indiInputs']['offset'])) 
        return price_series
        
    
    elif indicator_name =='low':
        price_series = dataframe['CH_TRADE_LOW_PRICE'].shift(-(indicator_details['indiInputs']['offset']))  
        return price_series
       

    elif indicator_name == 'volume':
        # Special handling for volume, which uses a different column name
        volume_series = dataframe['CH_TOT_TRADED_VAL'].shift(-(indicator_details['indiInputs']['offset']))  # Apply offset
        return volume_series   
        
       
    elif indicator_name == 'number':
        # Return a constant series if the indicator is a fixed number
        constant_value = float(indicator_details['indiInputs']['number'])
        return pd.Series([constant_value] * len(dataframe), index=dataframe.index)

    try:
        # func_params = map_params(indicator_name, indicator_details['indiInputs'])
        if temp_name == 'macd':
            indicator_function = getattr(ta, temp_name.lower())
        else:
            indicator_function = getattr(ta, indicator_name.lower())

        result = indicator_function(**data_columns, **func_params)
        

        if result.empty:
            raise ValueError(f"Indicator calculation failed: {indicator_name} returned no data.")
        # Select the specific output column if necessary (for example, for MACD, select signal line)
        output_column = get_output_column_name(indicator_name, params)

        
        
        if isinstance(result, pd.DataFrame) and output_column in result.columns:
           
            return result[output_column]
        
        return result
    
        # if len(data_columns) == 1:
        #     result = indicator_function(list(data_columns.values())[0], **func_params)
        # else:
        #     result = indicator_function(**data_columns, **func_params)

        # print(result)

        # if result is None or result.empty:
        #     raise ValueError(f"Indicator calculation failed: {indicator_name} returned no data.")
        # return result

        


    except AttributeError:
        print(f"Error: Indicator '{indicator_name}' is not supported by pandas_ta or is incorrectly named.")
        return pd.Series([None] * len(dataframe), index=dataframe.index)
    except Exception as e:
        print(f"Error calculating {indicator_name}: {e}")
        return pd.Series([None] * len(dataframe), index=dataframe.index)



def add_signals(dataframe, indicator_one, indicator_two, comparator):
    """Add buy and sell signals to the dataframe based on the comparator logic."""
    if comparator == "crosses-below":
        dataframe['Buy_Signal'] = (indicator_one < indicator_two) & (indicator_one.shift(1) >= indicator_two.shift(1))
        dataframe['Sell_Signal'] = (indicator_one > indicator_two) & (indicator_one.shift(1) <= indicator_two.shift(1))
    # Add additional logic for other comparators...
        


def evaluate_condition(data, condition):
    indicator_one_value = calculate_indicator(data, condition['indicatorOne'])
    indicator_two_value = calculate_indicator(data, condition['indicatorTwo'])

    # Initialize signals to False for the entire series
    buy_signal = pd.Series([False] * len(data), index=data.index)
    sell_signal = pd.Series([False] * len(data), index=data.index)

    if condition['comparator'] == 'crosses-below':
        buy_signal = (indicator_one_value < indicator_two_value) & (indicator_one_value.shift(1) >= indicator_two_value.shift(1))
        sell_signal = (indicator_one_value > indicator_two_value) & (indicator_one_value.shift(1) <= indicator_two_value.shift(1))
    elif condition['comparator'] == 'crosses-above':
        buy_signal = (indicator_one_value > indicator_two_value) & (indicator_one_value.shift(1) <= indicator_two_value.shift(1))
        sell_signal = (indicator_one_value < indicator_two_value) & (indicator_one_value.shift(1) >= indicator_two_value.shift(1))
    elif condition['comparator'] == 'equal-to':
        buy_signal = indicator_one_value == indicator_two_value
        sell_signal = indicator_one_value != indicator_two_value
    elif condition['comparator'] == 'higher-than':
        buy_signal = indicator_one_value > indicator_two_value
        sell_signal = indicator_one_value <= indicator_two_value
    elif condition['comparator'] == 'lower-than':
        buy_signal = indicator_one_value < indicator_two_value
        sell_signal = indicator_one_value >= indicator_two_value

    return buy_signal, sell_signal

# Function to combine signals from multiple conditions
def combine_signals(data, conditions, logical_operators):
    if len(conditions) == 1:
        # If there is only one condition, just evaluate it and return its signals
        buy_signal, sell_signal = evaluate_condition(data, conditions[0])
        return buy_signal, sell_signal
    
    elif len(conditions) > 1:
        # Combine signals when there are multiple conditions
        final_buy_signal, final_sell_signal = evaluate_condition(data, conditions[0])
        for i in range(1, len(conditions)):
            next_buy_signal, next_sell_signal = evaluate_condition(data, conditions[i])
            if logical_operators and i-1 < len(logical_operators):
                if logical_operators[i-1].upper() == 'AND':
                    final_buy_signal &= next_buy_signal
                    final_sell_signal &= next_sell_signal
                elif logical_operators[i-1].upper() == 'OR':
                    final_buy_signal |= next_buy_signal
                    final_sell_signal |= next_sell_signal
        return final_buy_signal, final_sell_signal
    else:
        # If no conditions are provided
        return pd.Series([False] * len(data)), pd.Series([False] * len(data))




# sbi_data = suppress_print(equity_history, symbol, series, start_date, end_date)


# sbi_data['mTIMESTAMP'] = pd.to_datetime(sbi_data['mTIMESTAMP'], format='%d-%b-%Y')

# sbi_data.sort_values(by='mTIMESTAMP', inplace=True)
# sbi_data.reset_index(drop=True, inplace=True)

# sbi_data['RSI'] = ta.momentum.rsi(sbi_data['CH_CLOSING_PRICE'], window=14)


# sbi_data['Indicator_One'] = calculate_indicator(sbi_data['CH_CLOSING_PRICE'], indicator_one_details)
# sbi_data['Indicator_Two'] = calculate_indicator(sbi_data['CH_CLOSING_PRICE'], indicator_two_details)


conditions = input_data.get('strategyDetails')['conditions']
operator = input_data.get('strategyDetails')['logicalOperators']

# print(conditions,operator)


# conditions = [
#     {
#         "indicatorOne": {
#             "value": "rsi",
#             "displayValue": "RSI",
#             "indiInputs": {
#                 "period": 10
#             }
#         },
#         "comparator": "crosses-above",
#         "indicatorTwo": {
#             "value": "rsi",
#             "displayValue": "RSI",
#             "indiInputs": {
#                 "period": 20
#             }
#         }
#     }
# ]

# operator = []

# strategy_type = 'buy'
# graph_type = 'heikin-ashi'
# buy_signals, sell_signals = combine_signals(sbi_data, conditions, operator)

# sbi_data['Buy_Signal'] = buy_signals
# sbi_data['Sell_Signal'] = sell_signals



RSI_BUY = 40
RSI_SELL = 50





# comparator = input_conditions

# if comparator == "crosses-below":
#     sbi_data['Buy_Signal'] = (sbi_data['Indicator_One'] < sbi_data['Indicator_Two']) & (sbi_data['Indicator_One'].shift(1) >= sbi_data['Indicator_Two'].shift(1))
#     sbi_data['Sell_Signal'] = (sbi_data['Indicator_One'] > sbi_data['Indicator_Two']) & (sbi_data['Indicator_One'].shift(1) <= sbi_data['Indicator_Two'].shift(1))

# elif comparator == "crosses-above":
#     sbi_data['Buy_Signal'] = (sbi_data['Indicator_One'] > sbi_data['Indicator_Two']) & (sbi_data['Indicator_One'].shift(1) <= sbi_data['Indicator_Two'].shift(1))
#     sbi_data['Sell_Signal'] = (sbi_data['Indicator_One'] < sbi_data['Indicator_Two']) & (sbi_data['Indicator_One'].shift(1) >= sbi_data['Indicator_Two'].shift(1))

# elif comparator == "equal-to":
#     tolerance = 0.01  # Define your tolerance level
#     sbi_data['Buy_Signal'] = abs(sbi_data['Indicator_One'] - sbi_data['Indicator_Two']) <= tolerance
#     sbi_data['Sell_Signal'] = abs(sbi_data['Indicator_One'] - sbi_data['Indicator_Two']) > tolerance

# elif comparator == "lower-than":
#     sbi_data['Buy_Signal'] = sbi_data['Indicator_One'] < sbi_data['Indicator_Two']
#     sbi_data['Sell_Signal'] = sbi_data['Indicator_One'] >= sbi_data['Indicator_Two']

# elif comparator == "higher-than":
#     sbi_data['Buy_Signal'] = sbi_data['Indicator_One'] > sbi_data['Indicator_Two']
#     sbi_data['Sell_Signal'] = sbi_data['Indicator_One'] <= sbi_data['Indicator_Two']

# Generate buy signals (RSI crosses above RSI_BUY from below)
# sbi_data['Buy'] = (sbi_data['RSI'] > RSI_BUY) & (sbi_data['RSI'].shift(1) <= RSI_BUY)

# Generate sell signals (RSI crosses below RSI_SELL from above)
# sbi_data['Sell'] = (sbi_data['RSI'] < RSI_SELL) & (sbi_data['RSI'].shift(1) >= RSI_SELL)



def execute_and_analyze_strategy(data, stop_loss_pct, target_pct, initial_funds, quantity):
    is_in_position = False
    funds = initial_funds
    trades = []
    gains = []
    losses_values = []
    total_pnl = 0
    win_streak = loss_streak = current_streak = wins = losses = 0
    last_outcome = None
    peak_funds = initial_funds
    max_drawdown = 0
    
    for i in range(len(data)):
        if data['Buy'][i] and not is_in_position and funds >= data['CH_CLOSING_PRICE'][i] * quantity:
            buy_price = data['CH_CLOSING_PRICE'][i]
            funds -= buy_price * quantity  # Deduct the cost of buying from funds
            is_in_position = True
            trades.append({'action': 'Bought', 'price': buy_price, 'quantity': quantity})
    
        elif is_in_position:
            sell_price = data['CH_CLOSING_PRICE'][i]
            pnl = (sell_price - buy_price) * quantity
            funds += sell_price * quantity  # Add the proceeds of selling to funds
            total_pnl += pnl
            
            action = 'Sold (Sell Signal)'
            if pnl <= -stop_loss_pct * buy_price * quantity:
                action = 'Sold (Stop Loss)'
            elif pnl >= target_pct * buy_price * quantity:
                action = 'Sold (Target Reached)'
            
            trades.append({'action': action, 'price': sell_price, 'pnl': pnl, 'quantity': quantity})
            is_in_position = False
            
            if pnl > 0:
                wins += 1
                gains.append(pnl)
                current_streak = current_streak + 1 if last_outcome == 'win' else 1
                win_streak = max(win_streak, current_streak)
                last_outcome = 'win'
            else:
                losses += 1
                losses_values.append(pnl)
                current_streak = current_streak + 1 if last_outcome == 'loss' else 1
                loss_streak = max(loss_streak, current_streak)
                last_outcome = 'loss'
                
            # Update peak funds and drawdown
            peak_funds = max(peak_funds, funds)
            drawdown = peak_funds - funds
            max_drawdown = max(max_drawdown, drawdown)
    
    # Calculate final metrics
    total_trades = wins + losses
    avg_gain = sum(gains) / wins if wins else 0
    avg_loss = sum(losses_values) / losses if losses else 0
    win_rate = (wins / total_trades) * 100 if total_trades else 0
    loss_rate = (losses / total_trades) * 100 if total_trades else 0
    profit_factor = sum(gains) / -sum(losses_values) if losses_values else float('inf')

    return {
        'trades': trades,
        'Total Signals': total_trades,
        'Number of Wins': wins,
        'Number of Losses': losses,
        'Winning Streak': win_streak,
        'Losing Streak': loss_streak,
        'Max Gains': max(gains) if gains else 0,
        'Max Loss': min(losses_values) if losses_values else 0,
        'Avg Gain per Winning Trade': avg_gain,
        'Avg Loss per Losing Trade': avg_loss,
        'Max Drawdown': max_drawdown,
        'Win Rate (%)': win_rate,
        'Loss Rate (%)': loss_rate,
        'Profit Factor': profit_factor,
        'Total PnL': total_pnl,
        'Remaining Funds': funds
    }


# Example usage
# strategy_metrics = execute_and_analyze_strategy(sbi_data, stopLoss, target,initial_capital,quantity)


def execute_and_analyze_strategy_2(data, strategy_type, stop_loss_pct, trailing_stop_loss_pct, target_pct, initial_funds, quantity):
    is_in_position = False
    entry_price = 0
    funds = initial_funds
    trades = []
    gains=[]
    loss=[]
    total_pnl = 0
    total_brokerage = 0
    win_streak = 0
    loss_streak = 0
    current_streak = 1
    wins = 0
    losses = 0
    last_outcome = None
    peak_funds = initial_funds
    max_drawdown = 0
    max_drawdown_days = 0
    drawdown_start = None
    trade_dates = [data.index[0]]
    cumulative_pnl = [0]

    for i in range(len(data)):
        current_date = data.index[i]
        high_price = data['CH_TRADE_HIGH_PRICE'].iloc[i]
        low_price = data['CH_TRADE_LOW_PRICE'].iloc[i]
        close_price = data['CH_CLOSING_PRICE'].iloc[i]
        brokerage_per_trade = min(close_price * quantity * 0.0003, 20)
    
        if is_in_position:
            if trailing_stop_loss_pct:
                trailing_stop_loss_price = max(entry_price * (1 - trailing_stop_loss_pct), entry_price * (1 - stop_loss_pct))
                if strategy_type == 'buy':
                    if low_price <= trailing_stop_loss_price or high_price >= entry_price * (1 + target_pct):
                        action = 'Stop Loss' if low_price <= entry_price * (1 - stop_loss_pct) else 'Target Reached'
                        exit_price = close_price
                        pnl = (exit_price - entry_price) * quantity - brokerage_per_trade
                        funds += (exit_price * quantity - brokerage_per_trade)
                        total_pnl += pnl
                        total_brokerage += brokerage_per_trade
                        trades.append({
                            'symbol': symbol,
                            'action': 'Sell',
                            'price': exit_price,
                            'pnl': pnl,
                            'quantity': quantity,
                            'brokerage': brokerage_per_trade,
                            'date': current_date,
                            'trigger': action
                        })
                        is_in_position = False
                        trade_dates.append(current_date)
                        cumulative_pnl.append(cumulative_pnl[-1] + pnl)

                        # Track win or loss
                        if pnl > 0:
                            wins += 1
                            gains.append(pnl)
                            current_streak = 1 if last_outcome == 'loss' else current_streak + 1
                            last_outcome = 'win'
                        else:
                            losses += 1
                            loss.append(-pnl)
                            current_streak = 1 if last_outcome == 'win' else current_streak + 1
                            last_outcome = 'loss'

                        win_streak = max(win_streak, current_streak) if last_outcome == 'win' else win_streak
                        loss_streak = max(loss_streak, current_streak) if last_outcome == 'loss' else loss_streak

                        if funds > peak_funds:
                            peak_funds = funds
                            drawdown_start = None
                        else:
                            if drawdown_start is None:
                                drawdown_start = current_date
                            current_drawdown = peak_funds - funds
                            max_drawdown = max(max_drawdown, current_drawdown)
                            if drawdown_start is not None:
                                drawdown_days = (current_date - drawdown_start).days
                                max_drawdown_days = max(max_drawdown_days, drawdown_days)
                else:  # sell strategy
                    trailing_stop_loss_price = min(entry_price * (1 + trailing_stop_loss_pct), entry_price * (1 + stop_loss_pct))
                    if high_price >= trailing_stop_loss_price or low_price <= entry_price * (1 - target_pct):
                        action = 'Stop Loss' if high_price >= entry_price * (1 + stop_loss_pct) else 'Target Reached'
                        exit_price = close_price
                        pnl = (entry_price - exit_price) * quantity - brokerage_per_trade
                        funds += (exit_price * quantity - brokerage_per_trade)
                        total_pnl += pnl
                        total_brokerage += brokerage_per_trade
                        trades.append({
                            'symbol': symbol,
                            'action': 'Buy',
                            'price': exit_price,
                            'pnl': pnl,
                            'quantity': quantity,
                            'brokerage': brokerage_per_trade,
                            'date': current_date,
                            'trigger': action
                        })
                        is_in_position = False
                        trade_dates.append(current_date)
                        cumulative_pnl.append(cumulative_pnl[-1] + pnl)

                        # Track win or loss
                        if pnl > 0:
                            wins += 1
                            gains.append(pnl)
                            current_streak = 1 if last_outcome == 'loss' else current_streak + 1
                            last_outcome = 'win'
                        else:
                            losses += 1
                            loss.append(-pnl)
                            current_streak = 1 if last_outcome == 'win' else current_streak + 1
                            last_outcome = 'loss'

                        win_streak = max(win_streak, current_streak) if last_outcome == 'win' else win_streak
                        loss_streak = max(loss_streak, current_streak) if last_outcome == 'loss' else loss_streak

                        if funds > peak_funds:
                            peak_funds = funds
                            drawdown_start = None
                        else:
                            if drawdown_start is None:
                                drawdown_start = current_date
                            current_drawdown = peak_funds - funds
                            max_drawdown = max(max_drawdown, current_drawdown)
                            if drawdown_start is not None:
                                drawdown_days = (current_date - drawdown_start).days
                                max_drawdown_days = max(max_drawdown_days, drawdown_days)
            else:  # Use regular stop loss
                if strategy_type == 'buy':
                    if low_price <= entry_price * (1 - stop_loss_pct) or high_price >= entry_price * (1 + target_pct):
                        action = 'Stop Loss' if low_price <= entry_price * (1 - stop_loss_pct) else 'Target Reached'
                        exit_price = close_price
                        pnl = (exit_price - entry_price) * quantity - brokerage_per_trade
                        funds += (exit_price * quantity - brokerage_per_trade)
                        total_pnl += pnl
                        total_brokerage += brokerage_per_trade
                        trades.append({
                            'symbol': symbol,
                            'action': 'Sell',
                            'price': exit_price,
                            'pnl': pnl,
                            'quantity': quantity,
                            'brokerage': brokerage_per_trade,
                            'date': current_date,
                            'trigger': action
                        })
                        is_in_position = False
                        trade_dates.append(current_date)
                        cumulative_pnl.append(cumulative_pnl[-1] + pnl)

                        # Track win or loss
                        if pnl > 0:
                            wins += 1
                            gains.append(pnl)
                            current_streak = 1 if last_outcome == 'loss' else current_streak + 1
                            last_outcome = 'win'
                        else:
                            losses += 1
                            loss.append(-pnl)
                            current_streak = 1 if last_outcome == 'win' else current_streak + 1
                            last_outcome = 'loss'

                        win_streak = max(win_streak, current_streak) if last_outcome == 'win' else win_streak
                        loss_streak = max(loss_streak, current_streak) if last_outcome == 'loss' else loss_streak

                        if funds > peak_funds:
                            peak_funds = funds
                            drawdown_start = None
                        else:
                            if drawdown_start is None:
                                drawdown_start = current_date
                            current_drawdown = peak_funds - funds
                            max_drawdown = max(max_drawdown, current_drawdown)
                            if drawdown_start is not None:
                                drawdown_days = (current_date - drawdown_start).days
                                max_drawdown_days = max(max_drawdown_days, drawdown_days)
                else:  # sell strategy
                    if high_price >= entry_price * (1 + stop_loss_pct) or low_price <= entry_price * (1 - target_pct):
                        action = 'Stop Loss' if high_price >= entry_price * (1 + stop_loss_pct) else 'Target Reached'
                        exit_price = close_price
                        pnl = (entry_price - exit_price) * quantity - brokerage_per_trade
                        funds += (exit_price * quantity - brokerage_per_trade)
                        total_pnl += pnl
                        total_brokerage += brokerage_per_trade
                        trades.append({
                            'symbol': symbol,
                            'action': 'Buy',
                            'price': exit_price,
                            'pnl': pnl,
                            'quantity': quantity,
                            'brokerage': brokerage_per_trade,
                            'date': current_date,
                            'trigger': action
                        })
                        is_in_position = False
                        trade_dates.append(current_date)
                        cumulative_pnl.append(cumulative_pnl[-1] + pnl)

                        # Track win or loss
                        if pnl > 0:
                            wins += 1
                            gains.append(pnl)
                            current_streak = 1 if last_outcome == 'loss' else current_streak + 1
                            last_outcome = 'win'
                        else:
                            losses += 1
                            loss.append(-pnl)
                            current_streak = 1 if last_outcome == 'win' else current_streak + 1
                            last_outcome = 'loss'

                        win_streak = max(win_streak, current_streak) if last_outcome == 'win' else win_streak
                        loss_streak = max(loss_streak, current_streak) if last_outcome == 'loss' else loss_streak

                        if funds > peak_funds:
                            peak_funds = funds
                            drawdown_start = None
                        else:
                            if drawdown_start is None:
                                drawdown_start = current_date
                            current_drawdown = peak_funds - funds
                            max_drawdown = max(max_drawdown, current_drawdown)
                            if drawdown_start is not None:
                                drawdown_days = (current_date - drawdown_start).days
                                max_drawdown_days = max(max_drawdown_days, drawdown_days)

        entry_signal = data['Buy_Signal'].iloc[i] if strategy_type == 'buy' else data['Sell_Signal'].iloc[i]

        if entry_signal and not is_in_position:
            entry_price = close_price
            brokerage_per_trade = min(entry_price * quantity * 0.0003, 20)
            funds -= (entry_price * quantity + brokerage_per_trade) if strategy_type == 'buy' else (entry_price * quantity - brokerage_per_trade)
            is_in_position = True
            trades.append({
                'symbol': symbol,
                'action': 'Buy' if strategy_type == 'buy' else 'Sell',
                'price': entry_price,
                'quantity': quantity,
                'brokerage': brokerage_per_trade,
                'date': current_date,
                'trigger': 'Entry'
            })
            trade_dates.append(current_date)
            cumulative_pnl.append(cumulative_pnl[-1])
            total_brokerage += brokerage_per_trade

    # Final metrics calculation
    total_trades = wins + losses
    avg_gain = sum(gains) / wins if wins else 0
    avg_loss = sum(loss) / losses if losses else 0
    win_rate = (wins / total_trades * 100) if total_trades else 0
    loss_rate = (losses / total_trades * 100) if total_trades else 0
    reward_to_risk = avg_gain / avg_loss if avg_loss != 0 else float('inf')
    expectancy = (reward_to_risk * win_rate / 100) - (loss_rate / 100) if total_trades else 0

    return {
        'trades': trades,
        'Total Signals': total_trades,
        'Number of Wins': wins,
        'Number of Losses': losses,
        'Winning Streak': win_streak,
        'Losing Streak': loss_streak,
        'Max Gains': max(gains, default=0),
        'Max Loss': max(loss, default=0),
        'Avg Gain per Winning Trade': avg_gain,
        'Avg Loss per Losing Trade': avg_loss,
        'Max Drawdown': max_drawdown,
        'Max Drawdown Days': max_drawdown_days,
        'Win Rate (%)': win_rate,
        'Loss Rate (%)': loss_rate,
        'Expectancy': expectancy,
        'Profit Factor': reward_to_risk,
        'Total PnL': total_pnl,
        'Total Brokerage': total_brokerage,
        'Net PnL After Brokerage': total_pnl - total_brokerage,
        'Remaining Funds': funds,
        'Trade Dates': trade_dates,
        'Cumulative PnL': cumulative_pnl
    }




# strategy_metrics_2 = execute_and_analyze_strategy_2(sbi_data, stopLoss, target, initial_capital, quantity)


# trades = strategy_metrics_2['trades']
# funds_over_time = [initial_capital]
# trade_dates = [pd.to_datetime(start_date)]

# # Loop through trades to update funds tracking
# for trade in trades:
#     # Append new total funds after each trade
#     funds_over_time.append(funds_over_time[-1] + trade.get('pnl', 0))
#     trade_dates.append(pd.to_datetime(trade['date']))

# # Create DataFrame for plotting
# funds_df = pd.DataFrame({
#     'Date': trade_dates,
#     'Funds': funds_over_time
# })
# funds_df.set_index('Date', inplace=True)

# sbi_data['mTIMESTAMP'] = pd.to_datetime(sbi_data['mTIMESTAMP'])
# sbi_data.set_index('mTIMESTAMP', inplace=True)
# sbi_data.sort_index(inplace=True)

# buy_dates, buy_prices = [], []
# sell_dates, sell_prices = [], []

# for trade in trades:
#     if trade['action'] == 'Buy':
#         buy_dates.append(trade['date'])
#         buy_prices.append(trade['price'])
#     elif trade['action'] == 'Sell':
#         sell_dates.append(trade['date'])
#         sell_prices.append(trade['price'])

# # Convert lists to pandas series to align them with your data's index
# buy_dates = pd.to_datetime(buy_dates)
# sell_dates = pd.to_datetime(sell_dates)


# # Adjust figure size to better accommodate subplots
# plt.figure(figsize=(15, 10))  # Increase the size as needed

# # Plotting the closing prices
# plt.subplot(2, 1, 1)  # Adjust the subplot grid
# plt.plot(sbi_data.index, sbi_data['CH_CLOSING_PRICE'], label='Closing Price')
# plt.scatter(buy_dates, buy_prices, label='Buy', marker='^', color='green', alpha=0.7)
# plt.scatter(sell_dates, sell_prices, label='Sell', marker='v', color='red', alpha=0.7)
# plt.title(f'{symbol} Closing Prices and Trades')
# plt.legend()



# plt.subplot(2, 1, 2)
# plt.plot(funds_df.index, funds_df['Funds'], marker='o', linestyle='-', color='blue')
# plt.title('Total Pnl Over Time')
# plt.xlabel('Date')
# plt.ylabel('Total Pnl')
# plt.grid(True)
# plt.gca().xaxis.set_major_locator(mdates.AutoDateLocator())
# plt.gca().xaxis.set_major_formatter(mdates.DateFormatter('%Y-%m-%d'))
# plt.gcf().autofmt_xdate()  # Auto-format the x-axis for date formatting


# # Set x-axis to handle date formatting properly across all plots
# for ax in plt.gcf().axes:
#     ax.xaxis.set_major_locator(mdates.AutoDateLocator())
#     ax.xaxis.set_major_formatter(mdates.DateFormatter('%Y-%m-%d'))
#     plt.setp(ax.xaxis.get_majorticklabels(), rotation=45, ha='right')

# plt.tight_layout(pad=3.0)  # Adjust padding to prevent overlap
# plt.savefig(buf, format="png")  # Save the figure to the buffer
# plt.close()
# buf.seek(0)
# image_base64 = base64.b64encode(buf.getvalue()).decode('utf-8') 



class CustomEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Timestamp):
            # Format date in any format you prefer
            return obj.strftime('%Y-%m-%d')
        # Let the base class default method raise the TypeError
        return JSONEncoder.default(self, obj)
    


# results = {
#         # 'result':strategy_metrics,
#         'graph':image_base64,
#         'result_2':strategy_metrics_2

#     }

    # Output final results as JSON
# print(json.dumps(results))


results = []

for symbol in symbol:
    sbi_data = suppress_print(equity_history, symbol, series, start_date, end_date)
    sbi_data['mTIMESTAMP'] = pd.to_datetime(sbi_data['mTIMESTAMP'], format='%d-%b-%Y')
    sbi_data.sort_values(by='mTIMESTAMP', inplace=True)
    sbi_data.set_index('mTIMESTAMP', inplace=True)


    if graph_type == 'heikin-ashi':
        data = compute_heikin_ashi(sbi_data)
        buy_signals, sell_signals = combine_signals(data, conditions, operator)
        sbi_data['Buy_Signal'] = buy_signals
        sbi_data['Sell_Signal'] = sell_signals

    else:
        buy_signals, sell_signals = combine_signals(sbi_data, conditions, operator)
        sbi_data['Buy_Signal'] = buy_signals
        sbi_data['Sell_Signal'] = sell_signals

     
    # Execute strategy analysis
    strategy_metrics_2 = execute_and_analyze_strategy_2(sbi_data, strategy_type ,stopLoss,trailing_sl, target, initial_capital, quantity)
   
    trade_dates = pd.to_datetime(strategy_metrics_2['Trade Dates'])

    trades = strategy_metrics_2['trades']
    buy_dates = [pd.to_datetime(trade['date']) for trade in trades if trade['action'] == 'Buy']
    sell_dates = [pd.to_datetime(trade['date']) for trade in trades if trade['action'] == 'Sell']
    buy_prices = [trade['price'] for trade in trades if trade['action'] == 'Buy']
    sell_prices = [trade['price'] for trade in trades if trade['action'] == 'Sell']

    monthly_pnl = compute_monthly_pnl(strategy_metrics_2['trades'])

    # buf = BytesIO()
    # plt.figure(figsize=(10, 5))
    # plt.plot(sbi_data.index, sbi_data['CH_CLOSING_PRICE'], label='Closing Price')
    # plt.scatter(buy_dates, buy_prices, label='Buy', marker='^', color='green', alpha=0.7)
    # plt.scatter(sell_dates, sell_prices, label='Sell', marker='v', color='red', alpha=0.7)
    # plt.title(f'{symbol} Closing Prices and Trades')
    # plt.xlabel('Date')
    # plt.ylabel('Price')
    # plt.legend()
    # plt.grid(True)

    plt.figure(figsize=(15, 5))
    plt.plot(sbi_data.index, sbi_data['CH_CLOSING_PRICE'], label='Closing Price')

    # Plotting and annotating buy points
    for idx, price in zip(buy_dates, buy_prices):
        plt.scatter(idx, price, color='green', label='Buy' if idx == buy_dates[0] else "", marker='^')
        plt.annotate(f'Buy',  # This text can include any additional info
                    (idx, price),
                    textcoords="offset points",
                    xytext=(0,10),
                    ha='center')

    # Plotting and annotating sell points
    for idx, price in zip(sell_dates, sell_prices):
        plt.scatter(idx, price, color='red', label='Sell' if idx == sell_dates[0] else "", marker='v')
        plt.annotate(f'Sell',  # This text can include any additional info
                    (idx, price),
                    textcoords="offset points",
                    xytext=(0,-15),
                    ha='center')

    # Connect buy and sell points with lines
    for i in range(min(len(buy_dates), len(sell_dates))):
        plt.plot([buy_dates[i], sell_dates[i]], [buy_prices[i], sell_prices[i]], color='blue', linestyle='-', linewidth=1)

    plt.legend()
    plt.title('Trades')
    plt.xlabel('Date')
    plt.ylabel('Price')
    plt.grid(True)

    # Save to buffer and convert to base64 for web display or further processing
    plt.savefig(buf, format='png')
    plt.close()
    buf.seek(0)
    trade_graph = base64.b64encode(buf.getvalue()).decode('utf-8')
    # Funds Over Time Graph
    buf2 = BytesIO()
    plt.figure(figsize=(15, 5))
    plt.plot(trade_dates, strategy_metrics_2['Cumulative PnL'], label='Cumulative P&L', marker='o')  # Ensure you have 'funds_timeline' in your results
    plt.title(f'Cumulative P&L Over Time for {symbol}')
    plt.xlabel('Date')
    plt.ylabel('Pnl')
    plt.grid(True)
    plt.legend()
    plt.savefig(buf2, format='png')
    plt.close()
    buf2.seek(0)
    funds_graph = base64.b64encode(buf2.getvalue()).decode('utf-8')
    
    results.append({
        'symbol': symbol,
        'result': strategy_metrics_2,
        'trade_graph': trade_graph,
        'funds_graph': funds_graph,
        'monthly_pnl': monthly_pnl.to_json(orient='split')
    })


print(json.dumps(results, cls=CustomEncoder))