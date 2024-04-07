import pandas as pd
import pandas_ta as ta
import matplotlib.pyplot as plt
import numpy as np
from nsepython import *
import base64
from io import BytesIO

buf = BytesIO()
input_data = json.loads(sys.argv[1])

stopLoss=input_data.get('pyStoploss')
target=input_data.get('pyTarget')
symbol = input_data.get('backSymbol')
start_date = input_data.get('startDate')
end_date = input_data.get('endDate')
initial_capital = input_data.get('backCapital')
quantity=input_data.get('backQuantity')


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


sbi_data = suppress_print(equity_history, symbol, series, start_date, end_date)

sbi_data['RSI'] = ta.momentum.rsi(sbi_data['CH_CLOSING_PRICE'], window=14)


RSI_BUY = 40
RSI_SELL = 50


# Generate buy signals (RSI crosses above RSI_BUY from below)
sbi_data['Buy'] = (sbi_data['RSI'] > RSI_BUY) & (sbi_data['RSI'].shift(1) <= RSI_BUY)

# Generate sell signals (RSI crosses below RSI_SELL from above)
sbi_data['Sell'] = (sbi_data['RSI'] < RSI_SELL) & (sbi_data['RSI'].shift(1) >= RSI_SELL)

# def simulate_trades(data, stop_loss_pct, target_pct,total_pnl):
#     in_position = False
#     buy_price = np.nan
    

#     for i in range(len(data)):
#         if data['Buy'].iloc[i] and not in_position:
#             buy_price = data['CH_CLOSING_PRICE'].iloc[i]
#             in_position = True
#             trades.append({'action': 'Bought', 'price': buy_price})

#         elif in_position:
#             price_change = (data['CH_CLOSING_PRICE'].iloc[i] - buy_price) / buy_price
            
#             if price_change <= -stop_loss_pct:
#                 sell_price = data['CH_CLOSING_PRICE'].iloc[i]
#                 pnl = sell_price - buy_price
#                 total_pnl += pnl
#                 in_position = False
#                 buy_price = np.nan
#                 trades.append({'action': 'Sold (Stop Loss)', 'price': sell_price, 'pnl': pnl})

#             elif price_change >= target_pct:
#                 sell_price = data['CH_CLOSING_PRICE'].iloc[i]
#                 pnl = sell_price - buy_price
#                 total_pnl += pnl
#                 in_position = False
#                 buy_price = np.nan
#                 trades.append({'action': 'Sold (Target Reached)', 'price': sell_price, 'pnl': pnl})

#             elif data['Sell'].iloc[i]:
#                 sell_price = data['CH_CLOSING_PRICE'].iloc[i]
#                 pnl = sell_price - buy_price
#                 total_pnl += pnl
#                 in_position = False
#                 buy_price = np.nan
#                 trades.append({'action': 'Sold (Sell Signal)', 'price': sell_price, 'pnl': pnl})
                
#     # Include the last trade P&L if position still open
#     if in_position:
#         pnl = data['CH_CLOSING_PRICE'].iloc[-1] - buy_price
#         total_pnl += pnl
#         trades.append({'action': 'Sold (End of Data)', 'price': data['CH_CLOSING_PRICE'].iloc[-1], 'pnl': pnl})
        
#     # Compile final results
#     return total_pnl

# pnl=simulate_trades(sbi_data,stopLoss,target,total_pnl)


# def calculate_strategy_metrics(data):
#     is_in_position = False
#     buy_price = 0
#     wins = 0
#     losses = 0
#     win_streak = 0
#     loss_streak = 0
#     current_streak = 0
#     last_outcome = None
#     gains = []
#     losses_values = []
#     max_drawdown = 0
#     peak = 0
#     total_pnl = 0
    
#     for i in range(len(data)):
#         if data['Buy'].iloc[i] and not is_in_position:
#             buy_price = data['CH_CLOSING_PRICE'].iloc[i]
#             is_in_position = True
            
#         elif is_in_position:
#             sell_price = data['CH_CLOSING_PRICE'].iloc[i]
#             pnl = sell_price - buy_price
#             total_pnl += pnl
            
#             if pnl > 0:
#                 wins += 1
#                 gains.append(pnl)
#                 if last_outcome == 'win':
#                     current_streak += 1
#                 else:
#                     current_streak = 1
#                 win_streak = max(win_streak, current_streak)
#                 last_outcome = 'win'
                
#             elif pnl < 0:
#                 losses += 1
#                 losses_values.append(pnl)
#                 if last_outcome == 'loss':
#                     current_streak += 1
#                 else:
#                     current_streak = 1
#                 loss_streak = max(loss_streak, current_streak)
#                 last_outcome = 'loss'
                
#             # Reset for next trade
#             is_in_position = False
            
#             # Update drawdown
#             peak = max(peak, total_pnl)
#             drawdown = peak - total_pnl
#             max_drawdown = max(max_drawdown, drawdown)
            
#     total_trades = wins + losses
#     avg_gain = sum(gains) / wins if wins else 0
#     avg_loss = sum(losses_values) / losses if losses else 0
#     win_rate = wins / total_trades if total_trades else 0
#     loss_rate = losses / total_trades if total_trades else 0
#     profit_factor = sum(gains) / abs(sum(losses_values)) if losses else 0
    
#     return {
#         'Total Signals': total_trades,
#         'Number of Wins': wins,
#         'Number of Losses': losses,
#         'Winning Streak': win_streak,
#         'Losing Streak': loss_streak,
#         'Max Gains': max(gains) if gains else 0,
#         'Max Loss': min(losses_values) if losses_values else 0,
#         'Avg Gain per Winning Trade': avg_gain,
#         'Avg Loss per Losing Trade': avg_loss,
#         'Max Drawdown': max_drawdown,
#         'Win Rate': win_rate,
#         'Loss Rate': loss_rate,
#         'Profit Factor': profit_factor
#     }



# strategy_metrics = calculate_strategy_metrics(sbi_data)


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
strategy_metrics = execute_and_analyze_strategy(sbi_data, stopLoss, target,initial_capital,quantity)



plt.figure(figsize=(14, 9))

# Plotting the closing prices
plt.subplot(2, 1, 1) # (rows, columns, panel number)
plt.plot(sbi_data.index, sbi_data['CH_CLOSING_PRICE'], label='Closing Price')
plt.scatter(sbi_data.index[sbi_data['Buy']], sbi_data['CH_CLOSING_PRICE'][sbi_data['Buy']], label='Buy Signal', marker='^', color='green')
plt.scatter(sbi_data.index[sbi_data['Sell']], sbi_data['CH_CLOSING_PRICE'][sbi_data['Sell']], label='Sell Signal', marker='v', color='red')
plt.title( symbol +' Closing Prices and Signals')
plt.legend()

# Plotting the RSI values
plt.subplot(2, 1, 2)
plt.plot(sbi_data.index, sbi_data['RSI'], label='RSI', color='purple')
plt.axhline(70, linestyle='--', color='red', label='Overbought (70)')  # Overbought line
plt.axhline(30, linestyle='--', color='green', label='Oversold (30)')  # Oversold line
plt.title( symbol+' RSI')
plt.legend()
plt.tight_layout()
plt.savefig(buf, format="png")
plt.close()
buf.seek(0)
image_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')




results = {
        'result':strategy_metrics,
        'graph':image_base64
    }

    # Output final results as JSON
print(json.dumps(results))