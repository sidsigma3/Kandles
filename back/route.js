const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const db = require("./config/db");
const nodemailer = require("nodemailer");
var url = require("url");
const emailId = "sidsigma3@gmail.com";
const pass = "zsswervkokmbocgl";
const fs = require("fs");
const handlebars = require("handlebars");
const hbs = require("nodemailer-express-handlebars");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { error } = require("console");
const axios = require("axios");
const greeks = require("greeks");
const readline = require("readline");
const open = require("open");
const axiosCookieJarSupport = require("axios-cookiejar-support").default;
const tough = require("tough-cookie");
const KiteConnect = require("kiteconnect").KiteConnect;
const KiteTicker = require("kiteconnect").KiteTicker;
const WebSocket = require("ws");
const io = require("./server");

const htmlTemplate = fs.readFileSync(
  "C:/Users/sidsi/Desktop/intern/trade/src/components/WelocomeEmail.html",
  "utf8"
);
const resetEmail = fs.readFileSync(
  "C:/Users/sidsi/Desktop/intern/trade/src/components/resetEmail.html",
  "utf-8"
);
var access_token = null;

const cookieJar = new tough.CookieJar();

const sendEmail = async (recipient, userName) => {
  // create reusable transporter object using the default SMTP transport

  const source = htmlTemplate;
  const template = handlebars.compile(source);
  const replacements = {
    username: userName,
    login_url: recipient,
  };
  const htmlToSend = template(replacements);

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: emailId,
      pass: pass,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: emailId,
    to: recipient,
    subject: "Welcome Message",
    text: "welcome , How you doing?",
    html: htmlToSend,
  });

  console.log("Message sent: %s", info.messageId);
};
let loginAttempts = 0;

module.exports = function (io) {
  router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // check if the user has attempted to login 3 times
    if (loginAttempts >= 3) {
      res.json({
        stat: 401,
        msg: "You have exceeded the maximum number of login attempts. Please wait for 3 minute or try forgot password.",
      });
      setTimeout(() => {
        loginAttempts = 0;
      }, 60000);
      return;
    }

    db.query(
      "SELECT * FROM login.user WHERE email=? AND password=?",
      [email, password],
      (err, result) => {
        if (err) {
          console.log(err);
          res.json({
            stat: 500,
            msg: "Server error",
          });
        } else {
          if (result.length > 0) {
            loginAttempts = 0;
            res.json({
              stat: 200,
              msg: "Sucessfully entered website",
            });
          } else {
            loginAttempts++;
            res.json({
              stat: 201,
              msg:
                "Email and password doesn't match you have, " +
                (4 - loginAttempts) +
                " more attempts left",
            });
          }
        }
      }
    );
  });

  router.post("/signup", (req, res) => {
    console.log(req.body);

    const firstName = req.body.fname;
    const LastName = req.body.lname;
    const userName = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const repassword = req.body.rePassword;
    const phoneNumber = req.body.phone;

    const fullName = firstName + " " + LastName;

    db.query(
      "SELECT * FROM login.user WHERE email=? ",
      [email],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          if (result.length > 0) {
            res.json({
              stat: 201,
              msg: "user already registered",
            });
          } else {
            console.log(phoneNumber);
            db.query(
              "INSERT INTO login.user (fullName, userName, email,password,phoneNumber) VALUES (?,?,?,?,?)",
              [fullName, userName, email, password, phoneNumber],
              (err, resu) => {
                if (err) {
                  console.log(err);
                } else {
                  res.json({
                    stat: 200,
                    msg: "Succesfully Registered",
                  });

                  sendEmail(email, userName);
                }
              }
            );
          }
        }
      }
    );
  });

  router.post("/reset", (req, res) => {
    const email = req.body.email;

    const token = jwt.sign({ email }, "your-secret-key", { expiresIn: "1h" });

    db.query(
      "INSERT INTO password_reset_tokens (email, token) VALUES (?, ?)",
      [email, token],
      (error, results, fields) => {
        if (error) {
          console.error(error);
          res.status(500).send("Internal server error");
          return;
        }

        const resetLink = `http://localhost:3000/pass?email=${email}&token=${token}`;

        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true, // use SSL
          auth: {
            user: emailId,
            pass: pass,
          },
        });

        let mailOptions = transporter
          .sendMail({
            from: "sidsigma3@gmail.com",
            to: email,
            subject: "Password reset request",
            html: `<p>You have requested a password reset for your account. Please click the following link to reset your password:</p><p><a href="${resetLink}">${resetLink}</a></p>`,
          })
          .then(
            res.json({
              stat: 200,
              msg: "Succesfully Registered",
            })
          );
      }
    );
  });

  router.post("/change", (req, res) => {
    const email = req.body.Email;
    const password = req.body.pass;
    const repass = req.body.repass;

    if (password !== repass) {
      res.status(402);
    }

    db.query(
      "UPDATE login.user SET password = ? WHERE email = ?",
      [password, email],
      (error, results, fields) => {
        if (error) {
          console.error(error);
          res.status(500).send("Internal server error");
        } else {
          db.query(
            "DELETE FROM password_reset_tokens WHERE email = ?",
            [email],
            (error, results, fields) => {
              if (error) {
                console.error(error);
              }

              // res.status(200).send('Password changed successfully.');

              const source = resetEmail;
              const template = handlebars.compile(source);
              const replacements = {
                // username: "",
                // login_url:recipient
              };
              const emailToSend = template(replacements);

              let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true, // use SSL
                auth: {
                  user: emailId,
                  pass: pass,
                },
              });

              let info = transporter
                .sendMail({
                  from: emailId,
                  to: email,
                  subject: "Your password has been changed",

                  html: emailToSend,
                })
                .then(res.status(200).send("successfull"));
            }
          );
        }
      }
    );
  });

  router.post("/check", (req, res) => {
    const { email, token } = req.body;

    db.query(
      "SELECT * FROM password_reset_tokens WHERE email = ? AND token = ?",
      [email, token],
      (error, results, fields) => {
        if (error) {
          console.error(error);
          res.status(500).send("Internal server error");
          return;
        }

        if (results.length === 0) {
          res.status(400).send("Invalid or expired token");
          return;
        } else {
          res.status(200).json({ msg: true });
        }
      }
    );
  });

  const secret = "e9jpxrsvft5jkzxpzqys62g3e5slfagn";
  const apiKey = "thxudf2o662hgrk5";
  const kite = new KiteConnect({
    api_key: apiKey,
  });

  // const ticker = new KiteTicker({
  //   api_key: "your_api_key",
  //   access_token: "your_access_token",
  // });

  // ticker.connect();

  router.post("/user-info", (req, res) => {
    function getMargins(segment) {
      kite
        .getMargins(segment)
        .then(function (response) {
          console.log(response.available);
          const capital = response.available.live_balance;
          res.send({ capital });
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    getMargins(["equity"]);
  });

  router.post("/trade-info", (req, res) => {
    const symbol = req.body.index;
    let strike = null;
    const info = {};

    function getQuote(instruments) {
      kite
        .getQuote(instruments)
        .then(function (response) {
          console.log(response);
          strike = response[instruments[0]].last_price;
          res.send({ strike });
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    function getLTP(instruments) {
      kite
        .getLTP(instruments)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    getQuote(["NSE:" + symbol]);
    getLTP(["NSE:" + symbol]);
  });

  router.post("/connect", (req, res) => {
    const requestToken = req.body.requestToken;

    const connectKite = async () => {
      try {
        const response = await kite.generateSession(requestToken, secret);
        access_token = response.access_token;
        console.log("processing");
        await kite.setAccessToken(access_token);

        const ticker = new KiteTicker({
          api_key: "thxudf2o662hgrk5",
          access_token: access_token,
        });

        ticker.connect();
      } catch (error) {
        console.error(error);
      }
    };
    if (!access_token) {
      connectKite();
    }
  });

  router.post("/stock", async (req, res) => {
    const symbol = req.body.symbol;
    const expiryDate = req.body.date;
    const requestToken = req.body.requestToken;
    console.log(symbol);
    console.log(requestToken);
    let instrumentToken = null;

    const param = {
      tradingsymbol: "BCG", // Symbol of the stock
      exchange: "NSE", // Exchange on which the stock is listed
      transaction_type: "BUY", // Buy or Sell
      quantity: 1, // Quantity of shares to trade
      order_type: "MARKET", // Order type (MARKET, LIMIT, SL, SL-M)
      product: "CNC", // Product type (CNC for delivery-based trades)
      validity: "DAY", // Order validity (DAY, IOC, GTT)
      // trigger_price: 16, // Trigger price for stop loss order
    };

    function subscribeToOptionChain() {
      // Replace with your desired instrument tokens

      ticker.subscribe(instrumentToken);
      ticker.setMode(ticker.modeFull, instrumentToken);
    }
    const strikePrice = 2000;

    // subscribeToOptionChain()

    // getQuote(["NSE:"+symbol]);

    // getQuote([symbol+strikePrice+'CE']);

    getInstruments("NSE", "OPT", symbol);
    getQuote(["NSE:RELIANCE"]);
    // getOHLC(["NSE:RELIANCE"]);
    // getProfile()
    // getLTP(["NSE:RELIANCE"]);

    getMargins(["equity"]);

    getOrderHistory();

    getOrderTrades();
    getHoldings();

    // order(param);

    let optionChain = {
      calls: [],
      puts: [],
    };

    // ticker.on("ticks", function (ticks) {
    //   // Process the option chain data here
    //   for (const tick of ticks) {
    //     if (tick.instrument_token === instrumentToken) {
    //       // Extract data for call or put
    //       if (tick.instrument_type === "CE") {
    //         optionChain.calls.push(tick);
    //       } else if (tick.instrument_type === "PE") {
    //         optionChain.puts.push(tick);
    //       }
    //     }
    //   }
    // });

    function getInstruments(exchange, segment, tradingsymbol) {
      kite
        .getInstruments(exchange, segment, tradingsymbol)
        .then(function (response) {
          // console.log(response);
          const filteredInstruments = response.filter(
            (instrument) => instrument.tradingsymbol === tradingsymbol
          );
          const optionPrices = filteredInstruments.map(
            (instrument) => instrument.last_price
          );
          const strikePrices = filteredInstruments.map(
            (instrument) => instrument.strike
          );

          console.log("Option Prices:", optionPrices);
          console.log("Strike Prices:", strikePrices);
          console.log(filteredInstruments);
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    function order(orderParams) {
      kite
        .placeOrder("regular", orderParams)
        .then((response) => {
          console.log("Stop loss order placed successfully:", response);
        })
        .catch((error) => {
          console.error("Error placing stop loss order:", error);
        });
    }

    function getProfile() {
      kite
        .getProfile()
        .then(function (response) {
          console.log(response);
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    function getMargins(segment) {
      kite
        .getMargins(segment)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    async function getHoldings() {
      try {
        const holdings = await kite.getHoldings();

        console.log(holdings); // Print the holdings data to the console
      } catch (error) {
        console.error("Error fetching holdings:", error.message);
      }
    }

    function getLTP(instruments) {
      kite
        .getLTP(instruments)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (err) {
          console.log(err);
        });
    }
    function getLTP(instruments) {
      kite
        .getLTP(instruments)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (err) {
          console.log(err);
        });
    }
    function getOHLC(instruments) {
      kite
        .getOHLC(instruments)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    function getOrderHistory() {
      kite
        .getOrders()
        .then(function (response) {
          if (response.length === 0) {
            console.log("No orders.");
            return;
          }

          kite
            .getOrderHistory(response[0].order_id)
            .then(function (response) {
              console.log(response);
            })
            .catch(function (err) {
              console.log(err);
            });
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    function getOrderTrades() {
      kite
        .getOrders()
        .then(function (response) {
          var completedOrdersID;
          for (var order of response) {
            if (order.status === kite.STATUS_COMPLETE) {
              completedOrdersID = order.order_id;
              break;
            }
          }

          if (!completedOrdersID) {
            console.log("No completed orders.");
            return;
          }

          kite
            .getOrderTrades(completedOrdersID)
            .then(function (response) {
              console.log(response);
            })
            .catch(function (err) {
              console.log(err);
            });
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    function getQuote(instruments) {
      kite
        .getQuote(instruments)
        .then(function (response) {
          console.log(response);
          console.log(response["NSE:RELIANCE"].depth);
          const { data } = response;
          const optionChain = {
            calls: [],
            puts: [],
          };

          // filteredData.forEach(option => {
          //   const callOption = {
          //   strikePrice:option.CE?.strikePrice,
          //   expiryDate:option.CE?.expiryDate,
          //   underlying:option.CE?.underlying,
          //   identifier:option.CE?.identifier,
          //   openInterest:option.CE?.openInterest,
          //   changeinOpenInterest:option.CE?.changeinOpenInterest,
          //   pchangeinOpenInterest:option.CE?.pchangeinOpenInterest,
          //   totalTradedVolume:option.CE?.totalTradedVolume,
          //   impliedVolatility:option.CE?.impliedVolatility,
          //   lastPrice:option.CE?.lastPrice,
          //   change:option.CE?.change,
          //   pChange:option.CE?.pChange,
          //   totalBuyQuantity:option.CE?.totalBuyQuantity,
          //   totalSellQuantity:option.CE?.totalSellQuantity,
          //   bidQty:option.CE?.bidQty,
          //   bidprice:option.CE?.bidprice,
          //   askQty:option.CE?.askQty,
          //   askPrice:option.CE?.askPrice,
          //   underlyingValue:option.CE?.underlyingValue
          //   };

          //   const putOption = {
          //     strikePrice:option.PE?.strikePrice,
          //     expiryDate:option.PE?.expiryDate,
          //     underlying:option.PE?.underlying,
          //     identifier:option.PE?.identifier,
          //     openInterest:option.PE?.openInterest,
          //     changeinOpenInterest:option.PE?.changeinOpenInterest,
          //     pchangeinOpenInterest:option.PE?.pchangeinOpenInterest,
          //     totalTradedVolume:option.PE?.totalTradedVolume,
          //     impliedVolatility:option.PE?.impliedVolatility,
          //     lastPrice:option.PE?.lastPrice,
          //     change:option.PE?.change,
          //     pChange:option.PE?.pChange,
          //     totalBuyQuantity:option.PE?.totalBuyQuantity,
          //     totalSellQuantity:option.PE?.totalSellQuantity,
          //     bidQty:option.PE?.bidQty,
          //     bidprice:option.PE?.bidprice,
          //     askQty:option.PE?.askQty,
          //     askPrice:option.PE?.askPrice,
          //     underlyingValue:option.PE?.underlyingValue
          //     };
          //     optionChain.calls.push(callOption);
          //     optionChain.puts.push(putOption);

          // });
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  });

  // const head = {headers: {
  //       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
  //       'Accept-Language': 'en-US,en;q=0.9',
  //       'Accept-Encoding': 'gzip, deflate, br',
  //       'Referer': 'https://www.nseindia.com/',
  //       // cookie:cookieJar.getCookieStringSync('https://www.nseindia.com'),
  //       // cookie:'defaultLang=en; nsit=-arbJUepMbgT_ZAL13gPeFnO; AKA_A2=A; ak_bmsc=7641E6013C3ED0341E048CE9694BBD1C~000000000000000000000000000000~YAAQfidzaEhTRwGIAQAAnuHiIxP6AN4Gq9xiLAUD28mxZlBKMXm3whgrpilU0AxIKVcmZq2oAVTihecF4os1qRo9eixMJUwvunx4Y2CXqcobzyp5zm3ytsrczrxnEyN2VgoS1qxkSrVWSdcHibZACmj1ToBEXdXwxZUnRVxtArxXQKeGIGt8JY8phKLzESjv7PbNgIOkDekhP+g1/p72R+trriVbYdOV5pBlIjX0O8Rky5DcP3BSMJUxrS7LEdwX2WO8iFuNg9SX4yALTmtL34ix/AQKRIjuocXOxdYPP7rwOhjA88z7tD9iG7C33tv0eqsEG/YfRriCCLthm5qru9Tt2H2xO6sBISo4z3025JSXPpXYRNiuiPuzL+zId1CTsdIObu/yt1t8JiVxB1TlRD0J1TXwqSNvKWHshMGdzqWmRs/RiJEB6fndBJzjthNnfTl+f4QgtTRNeLBtPFyVH9eE1FFE4eWJAkm23GrOE8XpWd+IlU2svBrVkyydZA==; _gid=GA1.2.352090767.1684229924; _gat_UA-143761337-1=1; _ga=GA1.1.1973558800.1680625735; nseQuoteSymbols=[{"symbol":"SBIN","identifier":null,"type":"equity"},{"symbol":"TCS","identifier":null,"type":"equity"}]; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTY4NDIyOTk1NywiZXhwIjoxNjg0MjM3MTU3fQ.UyMhM21xwfMZASBJ8ii9wa_r2VD-uc_RhW7bSpMqqxk; _ga_PJSKY6CFJH=GS1.1.1684229251.92.1.1684229958.20.0.0; RT="z=1&dm=nseindia.com&si=0739144a-b036-4da5-82fa-14290217cb34&ss=lhq309xf&sl=5&tt=bxj&se=8c&bcn=//684d0d41.akstat.io/&nu=de6o9i2j&cl=wpc"; bm_sv=3E0CCDF39E76232D3BEDB526FE184FC9~YAAQfidzaMnJRwGIAQAAlrPtIxPedAvIfzWSx99xrAODOQW7gsUPTazxPp7obm6btOlPVJfXDyr0nvddsizVqbdTaxo24l1GRvB3ciOu3Ro29Xnl+hNOY9K4MCU0xr4XKcZF7L6OdqzH13zMgU4ZP3XsMd7kodpmPzniPDwKS8XeE/JoMJK7OgJCgdiS2t9yflvshL8TcQyaRZDLveLteXXXufVEvzbhR7ly23lF23fbhrdYjyoDLXwZwRS71wwnLO+F~1',
  //       'X-Requested-With': 'XMLHttpRequest',
  //       'Connection': 'keep-alive',
  //     }}

  // axios.get('https://www.nseindia.com',head)
  // .then((response)=>{
  //   console.log(response)
  //   cookies = response.headers['set-cookie'];
  //   console.log(cookies)
  //   const cookieJar = new tough.CookieJar();
  //   cookies.forEach(cookie => {
  //     cookieJar.setCookieSync(cookie, 'https://www.nseindia.com');
  //   });
  // })
  // .catch((error)=>{
  //   console.log(error)
  // })

  // const url=`https://www.nseindia.com/api/option-chain-equities?symbol=${symbol}&date=${expiryDate}`

  //
  //  axios.get(url, {
  //   headers: {
  //     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
  //     'Accept-Language': 'en-US,en;q=0.9',
  //     'Accept-Encoding': 'gzip, deflate, br',
  //     'Referer': 'https://www.nseindia.com/',
  //     cookie:cookieJar.getCookieStringSync('https://www.nseindia.com'),
  //     // cookie:'defaultLang=en; nsit=-arbJUepMbgT_ZAL13gPeFnO; AKA_A2=A; ak_bmsc=7641E6013C3ED0341E048CE9694BBD1C~000000000000000000000000000000~YAAQfidzaEhTRwGIAQAAnuHiIxP6AN4Gq9xiLAUD28mxZlBKMXm3whgrpilU0AxIKVcmZq2oAVTihecF4os1qRo9eixMJUwvunx4Y2CXqcobzyp5zm3ytsrczrxnEyN2VgoS1qxkSrVWSdcHibZACmj1ToBEXdXwxZUnRVxtArxXQKeGIGt8JY8phKLzESjv7PbNgIOkDekhP+g1/p72R+trriVbYdOV5pBlIjX0O8Rky5DcP3BSMJUxrS7LEdwX2WO8iFuNg9SX4yALTmtL34ix/AQKRIjuocXOxdYPP7rwOhjA88z7tD9iG7C33tv0eqsEG/YfRriCCLthm5qru9Tt2H2xO6sBISo4z3025JSXPpXYRNiuiPuzL+zId1CTsdIObu/yt1t8JiVxB1TlRD0J1TXwqSNvKWHshMGdzqWmRs/RiJEB6fndBJzjthNnfTl+f4QgtTRNeLBtPFyVH9eE1FFE4eWJAkm23GrOE8XpWd+IlU2svBrVkyydZA==; _gid=GA1.2.352090767.1684229924; _gat_UA-143761337-1=1; _ga=GA1.1.1973558800.1680625735; nseQuoteSymbols=[{"symbol":"SBIN","identifier":null,"type":"equity"},{"symbol":"TCS","identifier":null,"type":"equity"}]; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTY4NDIyOTk1NywiZXhwIjoxNjg0MjM3MTU3fQ.UyMhM21xwfMZASBJ8ii9wa_r2VD-uc_RhW7bSpMqqxk; _ga_PJSKY6CFJH=GS1.1.1684229251.92.1.1684229958.20.0.0; RT="z=1&dm=nseindia.com&si=0739144a-b036-4da5-82fa-14290217cb34&ss=lhq309xf&sl=5&tt=bxj&se=8c&bcn=//684d0d41.akstat.io/&nu=de6o9i2j&cl=wpc"; bm_sv=3E0CCDF39E76232D3BEDB526FE184FC9~YAAQfidzaMnJRwGIAQAAlrPtIxPedAvIfzWSx99xrAODOQW7gsUPTazxPp7obm6btOlPVJfXDyr0nvddsizVqbdTaxo24l1GRvB3ciOu3Ro29Xnl+hNOY9K4MCU0xr4XKcZF7L6OdqzH13zMgU4ZP3XsMd7kodpmPzniPDwKS8XeE/JoMJK7OgJCgdiS2t9yflvshL8TcQyaRZDLveLteXXXufVEvzbhR7ly23lF23fbhrdYjyoDLXwZwRS71wwnLO+F~1',
  //     'X-Requested-With': 'XMLHttpRequest',
  //     'Connection': 'keep-alive',
  //   }
  // })
  // .then((response) => {
  //   const { data } = response;
  //   const expiries = data.records.expiryDates;

  //   const filteredData = data.filtered.data.filter(option => option.expiryDate === expiryDate);

  //   const optionChain = {
  //     calls: [],
  //     puts: [],
  //   };

  //   filteredData.forEach(option => {
  //     const callOption = {
  //     strikePrice:option.CE?.strikePrice,
  //     expiryDate:option.CE?.expiryDate,
  //     underlying:option.CE?.underlying,
  //     identifier:option.CE?.identifier,
  //     openInterest:option.CE?.openInterest,
  //     changeinOpenInterest:option.CE?.changeinOpenInterest,
  //     pchangeinOpenInterest:option.CE?.pchangeinOpenInterest,
  //     totalTradedVolume:option.CE?.totalTradedVolume,
  //     impliedVolatility:option.CE?.impliedVolatility,
  //     lastPrice:option.CE?.lastPrice,
  //     change:option.CE?.change,
  //     pChange:option.CE?.pChange,
  //     totalBuyQuantity:option.CE?.totalBuyQuantity,
  //     totalSellQuantity:option.CE?.totalSellQuantity,
  //     bidQty:option.CE?.bidQty,
  //     bidprice:option.CE?.bidprice,
  //     askQty:option.CE?.askQty,
  //     askPrice:option.CE?.askPrice,
  //     underlyingValue:option.CE?.underlyingValue
  //     };

  //     const putOption = {
  //       strikePrice:option.PE?.strikePrice,
  //       expiryDate:option.PE?.expiryDate,
  //       underlying:option.PE?.underlying,
  //       identifier:option.PE?.identifier,
  //       openInterest:option.PE?.openInterest,
  //       changeinOpenInterest:option.PE?.changeinOpenInterest,
  //       pchangeinOpenInterest:option.PE?.pchangeinOpenInterest,
  //       totalTradedVolume:option.PE?.totalTradedVolume,
  //       impliedVolatility:option.PE?.impliedVolatility,
  //       lastPrice:option.PE?.lastPrice,
  //       change:option.PE?.change,
  //       pChange:option.PE?.pChange,
  //       totalBuyQuantity:option.PE?.totalBuyQuantity,
  //       totalSellQuantity:option.PE?.totalSellQuantity,
  //       bidQty:option.PE?.bidQty,
  //       bidprice:option.PE?.bidprice,
  //       askQty:option.PE?.askQty,
  //       askPrice:option.PE?.askPrice,
  //       underlyingValue:option.PE?.underlyingValue
  //       };
  //       optionChain.calls.push(callOption);
  //       optionChain.puts.push(putOption);

  //   });
  //       // console.log(optionChain)
  //   res.send(optionChain)

  // }).catch((error) => {
  //   console.error(error);
  //   res.status(500).send('Server Error');
  // })

  // })

  router.post("/calculate-greeks", (req, res) => {
    const apiKey = "OOT5PNL8EV6DJ5J8";
    const symbol = req.body.symbol;
    const expiryDate = req.body.date;

    const optionChain = {
      calls: [],
      puts: [],
      spotPrice: "",
    };

    const url = `https://opstra.definedge.com/api/openinterest/optionchain/free/${symbol}&${expiryDate}`;

    axios
      .get(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
          "Accept-Language": "en-US,en;q=0.9",
          "Accept-Encoding": "gzip, deflate, br",
          // 'Referer': 'https://www.nseindia.com/',
          cookie:"_ga=GA1.2.1370922286.1680970843; _gid=GA1.2.1857155133.1688725603; JSESSIONID=CC92CB4AFA98851C581E806801A96E6C; _gat=1",
          "X-Requested-With": "XMLHttpRequest",
          Connection: "keep-alive",
        },
      })
      .then((response) => {
        const { data } = response;

        data.data.map((option) => {
          const callGreeksData = {
            gamma: option.CallGamma,
            vega: option.CallVega,
            theta: option.CallTheta,
            delta: option.CallDelta,
            strikePrice: option.StrikePrice,
            iv: option.CallIV,
          };

          optionChain.calls.push(callGreeksData);
          const putGreeksData = {
            gamma: option.PutGamma,
            vega: option.PutVega,
            theta: option.PutTheta,
            delta: option.PutDelta,
            strikePrice: option.StrikePrice,
            iv: option.PutIV,
          };

          optionChain.puts.push(putGreeksData);
        });

        res.send(optionChain);
      })
      .catch((error) => console.error(error));
  });

  router.post("/oi-changes", (req, res) => {
    const symbol = req.body.symbol;

    const expiryDate = req.body.date;

    const url1 = `https://www.nseindia.com/api/option-chain-equities?symbol=${symbol}&date=${expiryDate}`;

    const url2 = `https://www.nseindia.com/api/option-chain-indices?symbol=${symbol}`;

    let url = null;
    if (symbol === "NIFTY") {
      url = url2;
    } else {
      url = url1;
    }

    axios
      .get(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
          "Accept-Language": "en-US,en;q=0.9",
          "Accept-Encoding": "gzip, deflate, br",
          Referer: "https://www.nseindia.com/",
          cookie:
            'nsit=31mk32zNHt7zGiu65ZUiGybF; AKA_A2=A; defaultLang=en; ak_bmsc=E6C41E1B86FD06A0968867F1252A367B~000000000000000000000000000000~YAAQajLUF9/zUieJAQAAQXffLxSyn6IQlSdoKqLlppFnzo5QuUHvJZitdghlHNQyRcmk9fxXWBHOXhuJ7AbLI2+UUI1cgPS6sBF7oXzV9Re+558Ta7z1JPz50980m+A2lB89JUltJbkiHZnX6W/tMvos2mESlw36rj1LZR4o5LCfQA9WTgTPObNRywW1kKTdeY233BONTQ8cU7aHvwlcgOa754UA8jr5GaQ8QtUnGZrzHePNfrBiZ0NWRxb564uGLmtCPI3BBodd/XqWcPzTGZsjgFos9l6STXESaNokHLWq6C7XK2L3iejJQHO4TOUDkSHOMPfY92WsfgONrCBLjsvOpgMzJdbXFKG7kGgUiJYi4jXhLeLbMd9ZK5+WjFY5bDNZ+0MxXxaO5mKNql3mScIgd5wyBrq81mNe6Gsm1eCJCZ52dAwDRUV0TAHkg9Lr6FRaepTabBrjikVhkBRQurr6e7Fc7o1EtV3yKqWgjZ5DuV5aPsxkPooltw+wKQ==; _gid=GA1.2.2040011975.1688725329; _ga=GA1.1.1973558800.1680625735; nseQuoteSymbols=[{"symbol":"MARUTI","identifier":null,"type":"equity"}]; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTY4ODcyNTg4NywiZXhwIjoxNjg4NzMzMDg3fQ.tJTqCW6aCaUdp2C-XZDyi4l3HkyTleCxog4HtYla0ig; _ga_PJSKY6CFJH=GS1.1.1688725319.104.1.1688725886.54.0.0; RT="z=1&dm=nseindia.com&si=e19d469a-c6ff-44c1-b505-a909ae0d2136&ss=ljsfsbqy&sl=0&se=8c&tt=0&bcn=%2F%2F684d0d45.akstat.io%2F&nu=qdu7thgu&cl=7c6"; bm_sv=01B0C755800D3A25469AFA9685A2AFD9~YAAQajLUFyEgUyeJAQAAzyboLxQFLSf58vJVZarf3ctGmgiNCLQWWWqVHcrcZ3fHq1HpFhRw7o8Af1XmkEJZ8NoGfQTlQnkAwNGYmh0jSxfmlTfAJNyhlMuNu6Di+SW9O8LVBCevWAPr7t2xyLKZESCHTJRH7R9MpkPBgcLBcVQLjAims1lyzTcigR6t+yK6aiJ1obfIxwsV5W/3fM9HGDbjjCGjp7uZIlr2p98bLxuFiyKhLZPjbgwZL6FWucuGgKLa~1',
          "X-Requested-With": "XMLHttpRequest",
          Connection: "keep-alive",
        },
      })
      .then((response) => {
        const { data } = response;
        const filteredData = data.filtered.data;

        const optionChain = {
          calls: [],
          puts: [],
          pcr: [],
        };

        filteredData.forEach((option) => {
          const callOption = {
            strikePrice: option.CE?.strikePrice,
            expiryDate: option.CE?.expiryDate,
            underlying: option.CE?.underlying,
            lastPrice: option.CE?.lastPrice,
            openInterest: option.CE?.openInterest,
            changeinOpenInterest: option.CE?.changeinOpenInterest,
          };

          const putOption = {
            strikePrice: option.PE?.strikePrice,
            expiryDate: option.PE?.expiryDate,
            underlying: option.PE?.underlying,
            lastPrice: option.PE?.lastPrice,
            openInterest: option.PE?.openInterest,
            changeinOpenInterest: option.PE?.changeinOpenInterest,
          };
          optionChain.calls.push(callOption);
          optionChain.puts.push(putOption);

          const ratio =
            (option.PE?.openInterest + 0.5) / (0.5 + option.CE?.openInterest);

          optionChain.pcr.push(ratio);
        });
        console.log(optionChain);
        res.send(optionChain);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Server Error");
      });
  });

  router.post("/max-pain", (req, res) => {
    const symbol = req.body.symbol;

    const expiryDate = req.body.date;

    const url1 = `https://www.nseindia.com/api/option-chain-equities?symbol=${symbol}`;

    const url2 = `https://www.nseindia.com/api/option-chain-indices?symbol=${symbol}`;

    let url = null;
    if (symbol === "NIFTY") {
      url = url2;
    } else {
      url = url1;
    }

    axios
      .get(url, {
        withCredentials: true,
        jar: cookieJar,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
          "Accept-Language": "en-US,en;q=0.9",
          "Accept-Encoding": "gzip, deflate, br",
          Referer: "https://www.nseindia.com/",
          cookie:'nsit=31mk32zNHt7zGiu65ZUiGybF; AKA_A2=A; defaultLang=en; ak_bmsc=E6C41E1B86FD06A0968867F1252A367B~000000000000000000000000000000~YAAQajLUF9/zUieJAQAAQXffLxSyn6IQlSdoKqLlppFnzo5QuUHvJZitdghlHNQyRcmk9fxXWBHOXhuJ7AbLI2+UUI1cgPS6sBF7oXzV9Re+558Ta7z1JPz50980m+A2lB89JUltJbkiHZnX6W/tMvos2mESlw36rj1LZR4o5LCfQA9WTgTPObNRywW1kKTdeY233BONTQ8cU7aHvwlcgOa754UA8jr5GaQ8QtUnGZrzHePNfrBiZ0NWRxb564uGLmtCPI3BBodd/XqWcPzTGZsjgFos9l6STXESaNokHLWq6C7XK2L3iejJQHO4TOUDkSHOMPfY92WsfgONrCBLjsvOpgMzJdbXFKG7kGgUiJYi4jXhLeLbMd9ZK5+WjFY5bDNZ+0MxXxaO5mKNql3mScIgd5wyBrq81mNe6Gsm1eCJCZ52dAwDRUV0TAHkg9Lr6FRaepTabBrjikVhkBRQurr6e7Fc7o1EtV3yKqWgjZ5DuV5aPsxkPooltw+wKQ==; _gid=GA1.2.2040011975.1688725329; _gat_UA-143761337-1=1; _ga=GA1.1.1973558800.1680625735; nseQuoteSymbols=[{"symbol":"MARUTI","identifier":null,"type":"equity"}]; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTY4ODcyNTM0MSwiZXhwIjoxNjg4NzMyNTQxfQ.2TUXbZa8SSVz9C_HZ1Ebajlrw086ozjMzuLzE3s6Vlo; _ga_PJSKY6CFJH=GS1.1.1688725319.104.1.1688725339.40.0.0; RT="z=1&dm=nseindia.com&si=e19d469a-c6ff-44c1-b505-a909ae0d2136&ss=ljsfg9dy&sl=4&se=8c&tt=6uk&bcn=%2F%2F684d0d42.akstat.io%2F&ld=j9k&nu=qdu7thgu&cl=ji0"; bm_sv=01B0C755800D3A25469AFA9685A2AFD9~YAAQeDLUF4DDoySJAQAAW83fLxR+1EiCDh7b/T6zCjqtR+NlwVquhtZh2QEjYPKz4yBSLnkeeItgY2rJ0hqF+1VKC5mSn3Q2mOgBex6zmkQIIRjGLVvQfZT3+C67nVVuXV81MRYKyvVnCatb6Sx1F0zXuUHy2nDZ4piCeDn3SZJ/xCZxv1Q336UDfz7IPWIG179fypTqPLRk47RLkG46vzpbk+Vqb8AC+Vfc1GLQKKatiMFWZzUA4lBJSgtld7uCpkVW~1',
          "X-Requested-With": "XMLHttpRequest",
          Connection: "keep-alive",
        },
      })
      .then((response) => {
        const { data } = response;
        const expiries = data.records.expiryDate;
        const filteredData = data.filtered.data;

        const callPain = [];
        const putPain = [];

        let maxpain = [];
        filteredData.forEach((option, index) => {
          const strikePrice = option.CE?.strikePrice;

          const slicedEntries = Object.entries(filteredData).slice(0, index);

          let pain = 0;
          slicedEntries.forEach((option) => {
            const callOi = option[1].CE?.openInterest;

            const strikeP = option[1].CE?.strikePrice;

            const difference = strikePrice - strikeP;
            pain = pain + callOi * difference;
          });

          callPain.push(pain);
        });

        const keys = Object.keys(filteredData);
        for (let i = keys.length - 1; i >= 0; i--) {
          const key = keys[i];
          const value = filteredData[key];
          const strikePrice = filteredData[key].PE?.strikePrice;

          const slicedEntries = Object.entries(filteredData).slice(
            i,
            keys.length
          );
          let pain = 0;
          slicedEntries.forEach((option) => {
            const putOi = option[1].PE?.openInterest;
            const strikeP = option[1].PE?.strikePrice;

            const difference = Math.abs(strikePrice - strikeP);
            pain = pain + putOi * difference;
          });

          putPain.push(pain);
        }

        const pPain = putPain.reverse();

        filteredData.forEach((option, index) => {
          const result = {
            strikePrice: option.CE.strikePrice,
            maxPain: (callPain[index] + pPain[index]) * 75,
          };

          maxpain.push(result);
        });

        console.log(maxpain);
        res.send(maxpain);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Server Error");
      });
  });

  router.post("/kite", (req, res) => {
    const apiKey = "thxudf2o662hgrk5";
    const redirectUri = "http://localhost:3000/scanner";

    const login_url = `https://kite.zerodha.com/connect/login?api_key=${apiKey}&v=3`;

    open(login_url);
  });

  router.post("/punch", (req, res) => {
    const type = req.body.type;
    const order = req.body.order;
    const triggerPrice = req.body.triggerPrice;
    const pro = req.body.pro;
    const quantity = req.body.quantity;
    const symbol = req.body.symbol;
    var currPrice = null;
    var avgPrice = 0;
    const stocks = {};
    const instrument=[]
    const instrumentData={}
    const finalPnl ={}

    console.log(symbol, pro, order, type, quantity);

    const orderParams = {
      exchange: "NSE",
      tradingsymbol: symbol,
      quantity: quantity,
      transaction_type: type,
      order_type: order,
      product: pro,
    };

    // kite
    //   .placeOrder("regular", orderParams)
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (err) {
    //     console.error(err);
    //   });

    getPositions();


   

   
    const ticker = new KiteTicker({
      api_key: "thxudf2o662hgrk5",
      access_token: access_token,
    });

    ticker.connect();

    ticker.on("ticks", onTicks);
    ticker.on("connect", subscribe);
    ticker.on("order_update", onTrade);

    function onTicks(ticks) {
      console.log("Ticks", ticks);
      currPrice = ticks[0].last_price;
  
    
      ticks.forEach((tick) => {
        const instrumentToken = tick.instrument_token;
        const lastPrice = tick.last_price;
        const open = tick.ohlc.open
        // Update instrument data with the latest last price
        instrumentData[instrumentToken] = {
          open:open,
          lastPrice: lastPrice,
        };

      })


    }

    function subscribe() {
      
      ticker.subscribe(instrument);
      ticker.setMode(ticker.modeFull, instrument);
    }

    function onTrade(order) {
      console.log("holaaadasd");
      console.log(order);
    
      
    }


    io.on("connection", (socket) => {
     
      console.log("Client connected");

      setInterval(()=>{
        pnlCal(socket)}, 2000);

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });

    

    function getPositions() {
      kite
        .getPositions()
        .then(function (response) {
          console.log(response);
          // const pnlData = response.day.map((item) => ({
          //   symbol: item.tradingsymbol,
          //   pnl: item.pnl,
          // }));

          response.day.forEach((item) => {
            const symbol = item.tradingsymbol;
            const avgPrice = item.average_price;
            const quantity = item.quantity;
            const token =item.instrument_token
            
            instrument.push(token)

            if (!stocks[symbol]) {
              stocks[symbol] = {
                symbol,
                token,
                avgPrice,
                quantity
              };
            } else {
              stocks[symbol].avgPrice += avgPrice;
              stocks[symbol].quantity += quantity;
              stocks[symbol].token += token;
            }
          });

          console.log(stocks)

          console.log(instrument)


          res.send(stocks);
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    function pnlCal(){

      Object.values(stocks).map(item=>{
        const {symbol,token,avgPrice,quantity} =item


        if (instrumentData[token]) {
          const lastPrice = instrumentData[token].lastPrice;
          const open = instrumentData[token].open
          const pnl = (lastPrice - avgPrice) * quantity;
          
          const day= ((lastPrice-open)/open)*100

          console.log(pnl)
          const update = {
            symbol:symbol,
            pnl:pnl,
            dayChange:day,
            avgPrice:avgPrice,
            quantity:quantity,
            ltp:lastPrice
           }
         
        finalPnl[symbol]=update

        }


        io.emit('holdings',finalPnl)
      })


    }

  });

  router.post("/position", (req, res) => {
    var instrumentToken = null;
    var price = null;
    var avgPrice = null;
    var finalPnl = {};
    var pnlData =[]
    var instrumentSymbols=[]
    const instrumentData = {};


    kite
        .getHoldings()
        .then(function (response) {
         
           pnlData = response.map((item) => ({
            symbol: item.tradingsymbol,
            instrumentToken:item.instrument_token,
            pnl: item.pnl,
            quantity: item.quantity,
            ltp: item.last_price,
            dayChangePercentage: item.day_change_percentage,
            avgPrice: item.average_price,
          }));

          console.log(pnlData)
          pnlData.map((item)=>{
            instrumentSymbols.push(item.instrumentToken)
            }) 

          
          console.log(instrumentSymbols)
        })
        .catch(function (err) {
          console.log(err.response);
        });


    const ticker = new KiteTicker({
      api_key: "thxudf2o662hgrk5",
      access_token: access_token,
    });

    ticker.connect();
    ticker.on("ticks", onTicks);
    ticker.on("connect", subscribe);
    ticker.on("order_update", onTrade);

    function onTicks(ticks) {
    
      
      ticks.forEach((tick) => {
        const instrumentToken = tick.instrument_token;
        const lastPrice = tick.last_price;
        const open = tick.ohlc.open
        // Update instrument data with the latest last price
        instrumentData[instrumentToken] = {
          open:open,
          lastPrice: lastPrice,
        };

      });

    

    }

    function subscribe() {
      var items = [instrumentToken];
      ticker.subscribe(instrumentSymbols);
      ticker.setMode(ticker.modeFull, instrumentSymbols);
    }

    function onTrade(order) {
      console.log("holaaadasd");

      if (order.status === "COMPLETE" && order.pnl !== 0) {
        var pnl = order.pnl;
        console.log("P&L:", pnl);
      }
    }

    // getHoldings();

    function getHoldings() {
      kite
        .getHoldings()
        .then(function (response) {
          const pnlData = response.map((item) => ({
            symbol: item.tradingsymbol,
            pnl: item.pnl,
            quantity: item.quantity,
            ltp: item.last_price,
            dayChangePercentage: item.day_change_percentage,
            avgPrice: item.average_price,
          }));
          res.send(pnlData);
        })
        .catch(function (err) {
          console.log(err.response);
        });
    }

    io.on("connection", (socket) => {
     
      console.log("Client connected");

      setInterval(()=>{
        pnlCalculation(socket)}, 2000);

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });

    function getPositions() {
      kite
        .getPositions()
        .then(function (response) {
          const pnlData = response.net.map((item) => ({
            symbol: item.tradingsymbol,
            pnl: item.pnl,
          }));

          res.send(pnlData);
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    function pnlCalculation(socket) {
      

      pnlData.map((item)=>{
        
        
          const price = item.avgPrice
          const symbol= item.symbol
          const instrument = item.instrumentToken
          const quantity = item.quantity
          const  dayChange = item.dayChangePercentage
          const avgPrice =item.avgPrice

          console.log(price,symbol,instrument,quantity)

         if (instrumentData[instrument]) {
          const lastPrice = instrumentData[instrument].lastPrice;
          const open = instrumentData[instrument].open
          const pnl = (lastPrice - price) * quantity;
          
          const day= ((lastPrice-open)/open)*100

          console.log(pnl)
          const update = {
            symbol:symbol,
            pnl:pnl,
            dayChange:day,
            avgPrice:avgPrice,
            quantity:quantity,
            ltp:lastPrice
           }
         
        finalPnl[symbol]=update

        }

      })
      
      socket.emit("update", finalPnl);
    }
  });

  return router;
};
