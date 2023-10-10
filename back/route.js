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
const { v4: uuidv4 } = require('uuid');

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

  const secret = "1gr9bsa88g1td3o52do2bilh74kw8a73";
  const apiKey = "0bpuke0rhsjgq3lm";
  const kite = new KiteConnect({
    api_key: apiKey,
  });

  // const ticker = new KiteTicker({
  //   api_key: "your_api_key",
  //   access_token: "your_access_token",
  // });

  // ticker.connect();

 router.post("/user-info", async (req, res) => {
  try {
    // Fetch margin data
    const marginResponse = await getMargins(["equity"]);
    const capital = marginResponse.available.live_balance;

    // Fetch instrument data
    const instrumentResponse = await kite.getInstruments();
    const instruments = instrumentResponse;

    // Send the response to frontend
    res.send({ capital,instruments});
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send({ error: 'Something went wrong' });
  }
});

// Function to fetch margin data
function getMargins(segment) {
  return kite.getMargins(segment);
}


    let socketConnected = false
    router.post("/trade-info", (req, res) => {
     
      const symbol = req.body.index;
      const exchange = req.body.exchange
      let strike = null;
      const info = {};
      const instrument=[]
      
      
        const ticker = new KiteTicker({
          api_key: "0bpuke0rhsjgq3lm",
          access_token: access_token,
        });
    
          getQuote([exchange+":" + symbol]);
    
          function getQuote(instruments) {
            kite
              .getQuote(instruments)
              .then(function (response) {
                console.log(response);
                const token = response[instruments[0]].instrument_token;
                instrument.push(token)
  
                console.log(instrument)
                
                ticker.connect();
                ticker.on("ticks", onTicks);
                ticker.on("connect", subscribe);
    
              })
              .catch(function (err) {
                console.log(err);
              });
          }  
    
          
        function sock (){
         

          setInterval(()=>{
            strikePrice(strike)}, 2000);
    

          if (socketConnected) {
            // Disconnect the previous socket connection
            io.close();
            socketConnected = false;
          }


          io.on("connection", (socket) => {
                 
            console.log("Client connected");
      
            setInterval(()=>{
              strikePrice(strike)}, 2000);
      
            socket.on("disconnect", () => {
              console.log("Client disconnected");
            });
          });
      
          // socketConnected = true

        }
    
        // sock()
        res.send()
        
    
        function onTicks(ticks) {
         
          currPrice = ticks[0].last_price;
          
          
          ticks.forEach((tick) => {
            const instrumentToken = tick.instrument_token;
            const lastPrice = tick.last_price;
            const open = tick.ohlc.open
            // Update instrument data with the latest last price
            strike =lastPrice
            io.emit('strike',{strike:strike,index:symbol})
            
          })
    
        }
    
        function subscribe() {
          
          ticker.subscribe(instrument);
          ticker.setMode(ticker.modeFull, instrument);
        }
    

        function strikePrice(strike){
          console.log(strike,symbol)
            io.emit('strike',{strike:strike,index:symbol})

        }





        // function getQuote(instruments) {
        //   kite
        //     .getQuote(instruments)
        //     .then(function (response) {
        //       console.log(response);
        //       strike = response[instruments[0]].last_price;
        //       res.send({ strike });
        //     })
        //     .catch(function (err) {
        //       console.log(err);
        //     });
        // }

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
          api_key: "0bpuke0rhsjgq3lm",
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
   

  const head = {headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Referer': 'https://www.nseindia.com/',
        // cookie:cookieJar.getCookieStringSync('https://www.nseindia.com'),
        // cookie:'defaultLang=en; nsit=-arbJUepMbgT_ZAL13gPeFnO; AKA_A2=A; ak_bmsc=7641E6013C3ED0341E048CE9694BBD1C~000000000000000000000000000000~YAAQfidzaEhTRwGIAQAAnuHiIxP6AN4Gq9xiLAUD28mxZlBKMXm3whgrpilU0AxIKVcmZq2oAVTihecF4os1qRo9eixMJUwvunx4Y2CXqcobzyp5zm3ytsrczrxnEyN2VgoS1qxkSrVWSdcHibZACmj1ToBEXdXwxZUnRVxtArxXQKeGIGt8JY8phKLzESjv7PbNgIOkDekhP+g1/p72R+trriVbYdOV5pBlIjX0O8Rky5DcP3BSMJUxrS7LEdwX2WO8iFuNg9SX4yALTmtL34ix/AQKRIjuocXOxdYPP7rwOhjA88z7tD9iG7C33tv0eqsEG/YfRriCCLthm5qru9Tt2H2xO6sBISo4z3025JSXPpXYRNiuiPuzL+zId1CTsdIObu/yt1t8JiVxB1TlRD0J1TXwqSNvKWHshMGdzqWmRs/RiJEB6fndBJzjthNnfTl+f4QgtTRNeLBtPFyVH9eE1FFE4eWJAkm23GrOE8XpWd+IlU2svBrVkyydZA==; _gid=GA1.2.352090767.1684229924; _gat_UA-143761337-1=1; _ga=GA1.1.1973558800.1680625735; nseQuoteSymbols=[{"symbol":"SBIN","identifier":null,"type":"equity"},{"symbol":"TCS","identifier":null,"type":"equity"}]; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTY4NDIyOTk1NywiZXhwIjoxNjg0MjM3MTU3fQ.UyMhM21xwfMZASBJ8ii9wa_r2VD-uc_RhW7bSpMqqxk; _ga_PJSKY6CFJH=GS1.1.1684229251.92.1.1684229958.20.0.0; RT="z=1&dm=nseindia.com&si=0739144a-b036-4da5-82fa-14290217cb34&ss=lhq309xf&sl=5&tt=bxj&se=8c&bcn=//684d0d41.akstat.io/&nu=de6o9i2j&cl=wpc"; bm_sv=3E0CCDF39E76232D3BEDB526FE184FC9~YAAQfidzaMnJRwGIAQAAlrPtIxPedAvIfzWSx99xrAODOQW7gsUPTazxPp7obm6btOlPVJfXDyr0nvddsizVqbdTaxo24l1GRvB3ciOu3Ro29Xnl+hNOY9K4MCU0xr4XKcZF7L6OdqzH13zMgU4ZP3XsMd7kodpmPzniPDwKS8XeE/JoMJK7OgJCgdiS2t9yflvshL8TcQyaRZDLveLteXXXufVEvzbhR7ly23lF23fbhrdYjyoDLXwZwRS71wwnLO+F~1',
        'X-Requested-With': 'XMLHttpRequest',
        'Connection': 'keep-alive',
      }}

  axios.get('https://www.nseindia.com',head)
  .then((response)=>{
    console.log(response)
    cookies = response.headers['set-cookie'];
    console.log(cookies)
    const cookieJar = new tough.CookieJar();
    cookies.forEach(cookie => {
      cookieJar.setCookieSync(cookie, 'https://www.nseindia.com');
    });
  })
  .catch((error)=>{
    console.log(error)
  })

  const url=`https://www.nseindia.com/api/option-chain-equities?symbol=${symbol}&date=${expiryDate}`

   
   axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Referer': 'https://www.nseindia.com/',
      cookie:cookieJar.getCookieStringSync('https://www.nseindia.com'),
      // cookie:'defaultLang=en; nsit=-arbJUepMbgT_ZAL13gPeFnO; AKA_A2=A; ak_bmsc=7641E6013C3ED0341E048CE9694BBD1C~000000000000000000000000000000~YAAQfidzaEhTRwGIAQAAnuHiIxP6AN4Gq9xiLAUD28mxZlBKMXm3whgrpilU0AxIKVcmZq2oAVTihecF4os1qRo9eixMJUwvunx4Y2CXqcobzyp5zm3ytsrczrxnEyN2VgoS1qxkSrVWSdcHibZACmj1ToBEXdXwxZUnRVxtArxXQKeGIGt8JY8phKLzESjv7PbNgIOkDekhP+g1/p72R+trriVbYdOV5pBlIjX0O8Rky5DcP3BSMJUxrS7LEdwX2WO8iFuNg9SX4yALTmtL34ix/AQKRIjuocXOxdYPP7rwOhjA88z7tD9iG7C33tv0eqsEG/YfRriCCLthm5qru9Tt2H2xO6sBISo4z3025JSXPpXYRNiuiPuzL+zId1CTsdIObu/yt1t8JiVxB1TlRD0J1TXwqSNvKWHshMGdzqWmRs/RiJEB6fndBJzjthNnfTl+f4QgtTRNeLBtPFyVH9eE1FFE4eWJAkm23GrOE8XpWd+IlU2svBrVkyydZA==; _gid=GA1.2.352090767.1684229924; _gat_UA-143761337-1=1; _ga=GA1.1.1973558800.1680625735; nseQuoteSymbols=[{"symbol":"SBIN","identifier":null,"type":"equity"},{"symbol":"TCS","identifier":null,"type":"equity"}]; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTY4NDIyOTk1NywiZXhwIjoxNjg0MjM3MTU3fQ.UyMhM21xwfMZASBJ8ii9wa_r2VD-uc_RhW7bSpMqqxk; _ga_PJSKY6CFJH=GS1.1.1684229251.92.1.1684229958.20.0.0; RT="z=1&dm=nseindia.com&si=0739144a-b036-4da5-82fa-14290217cb34&ss=lhq309xf&sl=5&tt=bxj&se=8c&bcn=//684d0d41.akstat.io/&nu=de6o9i2j&cl=wpc"; bm_sv=3E0CCDF39E76232D3BEDB526FE184FC9~YAAQfidzaMnJRwGIAQAAlrPtIxPedAvIfzWSx99xrAODOQW7gsUPTazxPp7obm6btOlPVJfXDyr0nvddsizVqbdTaxo24l1GRvB3ciOu3Ro29Xnl+hNOY9K4MCU0xr4XKcZF7L6OdqzH13zMgU4ZP3XsMd7kodpmPzniPDwKS8XeE/JoMJK7OgJCgdiS2t9yflvshL8TcQyaRZDLveLteXXXufVEvzbhR7ly23lF23fbhrdYjyoDLXwZwRS71wwnLO+F~1',
      'X-Requested-With': 'XMLHttpRequest',
      'Connection': 'keep-alive',
    }
  })
  .then((response) => {
    const { data } = response;
    const expiries = data.records.expiryDates;

    const filteredData = data.filtered.data.filter(option => option.expiryDate === expiryDate);

    const optionChain = {
      calls: [],
      puts: [],
    };

    filteredData.forEach(option => {
      const callOption = {
      strikePrice:option.CE?.strikePrice,
      expiryDate:option.CE?.expiryDate,
      underlying:option.CE?.underlying,
      identifier:option.CE?.identifier,
      openInterest:option.CE?.openInterest,
      changeinOpenInterest:option.CE?.changeinOpenInterest,
      pchangeinOpenInterest:option.CE?.pchangeinOpenInterest,
      totalTradedVolume:option.CE?.totalTradedVolume,
      impliedVolatility:option.CE?.impliedVolatility,
      lastPrice:option.CE?.lastPrice,
      change:option.CE?.change,
      pChange:option.CE?.pChange,
      totalBuyQuantity:option.CE?.totalBuyQuantity,
      totalSellQuantity:option.CE?.totalSellQuantity,
      bidQty:option.CE?.bidQty,
      bidprice:option.CE?.bidprice,
      askQty:option.CE?.askQty,
      askPrice:option.CE?.askPrice,
      underlyingValue:option.CE?.underlyingValue
      };

      const putOption = {
        strikePrice:option.PE?.strikePrice,
        expiryDate:option.PE?.expiryDate,
        underlying:option.PE?.underlying,
        identifier:option.PE?.identifier,
        openInterest:option.PE?.openInterest,
        changeinOpenInterest:option.PE?.changeinOpenInterest,
        pchangeinOpenInterest:option.PE?.pchangeinOpenInterest,
        totalTradedVolume:option.PE?.totalTradedVolume,
        impliedVolatility:option.PE?.impliedVolatility,
        lastPrice:option.PE?.lastPrice,
        change:option.PE?.change,
        pChange:option.PE?.pChange,
        totalBuyQuantity:option.PE?.totalBuyQuantity,
        totalSellQuantity:option.PE?.totalSellQuantity,
        bidQty:option.PE?.bidQty,
        bidprice:option.PE?.bidprice,
        askQty:option.PE?.askQty,
        askPrice:option.PE?.askPrice,
        underlyingValue:option.PE?.underlyingValue
        };
        optionChain.calls.push(callOption);
        optionChain.puts.push(putOption);

    });
        // console.log(optionChain)
    res.send(optionChain)

  }).catch((error) => {
    console.error(error);
    res.status(500).send('Server Error');
  })

  })

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
          cookie:"_ga=GA1.2.1370922286.1680970843; JSESSIONID=E79D7D0FCA2D2DC9EE3E8199FC58227B",
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
            '_ga=GA1.1.1973558800.1680625735; defaultLang=en; nsit=pn3FUNKy90DxCqN4D7iM9A1p; AKA_A2=A; ak_bmsc=C1DE16DAA07931FA2E35D75F653A18F5~000000000000000000000000000000~YAAQRjZ6XPX6io+JAQAAQ5BFkhQNeCoiHhLxkQ45YTfHd7UdGl5Cn9fiLdG8cUZX56GUz3Du7bdl4m/QC1oyIMf71IsASspmBezY5Mq8bBbTOwzfYtqG0N0CEeh5Hus1u0TwUz+msddHV4TW9PGZ7hSSLNN5PkrskNPqmsSgOnb6fWHMK9RNCoo79l8ZEwphPHueRYFpRpN6jWclH0x/XEMnSZxc4CppnEE+ul8V+qsdzBsgeODqsgGyqEVuD7go6DQxy0ZJe6Nx6blQT4B9D9CTwjnU9E32uMrt3QcKnnBvjS9VJ7GIWOO/U4vffPs/XN061PUGrYs0ndtdduBM3SkxGyM6Ab+13X+TJpBSDjIbDjtiNtDVtzXWJrU7PNG0FnvTv2BLCTUoiLshJMj3ugmbgD+f7g1MocJVgJqBVwEQA1v18iLYyLeMw6+bWk4iAT8GCK0cvAFEMAKYqcsrVU5mUWEblniWZT9J5vIQva7jmGYEPuuHBHFynL2Q; nseQuoteSymbols=[{"symbol":"TATACONSUM","identifier":null,"type":"equity"}]; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTY5MDM3NjE5NiwiZXhwIjoxNjkwMzgzMzk2fQ.liX0qdn000TB-lF9g-t_LotbLXkt_h-ltttubAbANsQ; _ga_PJSKY6CFJH=GS1.1.1690376183.108.1.1690376198.45.0.0; RT="z=1&dm=nseindia.com&si=d4b6ede0-bbc8-47e3-8269-561cca54c032&ss=lkjqbupb&sl=2&se=8c&tt=cg5&bcn=%2F%2F684dd331.akstat.io%2F&ld=ken&nu=eaogvpgq&cl=lu2"; bm_sv=EDDA093E6EF001E7EE20F6931E93B608~YAAQRjZ6XOb9io+JAQAAFeVFkhQhU1MVNlDQXwFD3uQqVQgv5fTIQyBJxu0MM/4OXdOP2XV58nG0TRG534LTPfd6KW3AtWjt3Pjgddl5i0K2oWATJOQ4i+r4Fvy9Sw/wG3WiIs6IRnzS6WuNBf8uGvlLTpAH6Uqrl02RqnJBAv608N1Tj+Z61Ihsr5bEWIsVCoRI39hEu1922SPW1MzPlMEmM48wtWvoMjYLJJk/P4ScglPkDuO7TyZ8r/0tRPTYH/5N~1',
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
          cookie:'_ga=GA1.1.1973558800.1680625735; defaultLang=en; nsit=pn3FUNKy90DxCqN4D7iM9A1p; AKA_A2=A; ak_bmsc=C1DE16DAA07931FA2E35D75F653A18F5~000000000000000000000000000000~YAAQRjZ6XPX6io+JAQAAQ5BFkhQNeCoiHhLxkQ45YTfHd7UdGl5Cn9fiLdG8cUZX56GUz3Du7bdl4m/QC1oyIMf71IsASspmBezY5Mq8bBbTOwzfYtqG0N0CEeh5Hus1u0TwUz+msddHV4TW9PGZ7hSSLNN5PkrskNPqmsSgOnb6fWHMK9RNCoo79l8ZEwphPHueRYFpRpN6jWclH0x/XEMnSZxc4CppnEE+ul8V+qsdzBsgeODqsgGyqEVuD7go6DQxy0ZJe6Nx6blQT4B9D9CTwjnU9E32uMrt3QcKnnBvjS9VJ7GIWOO/U4vffPs/XN061PUGrYs0ndtdduBM3SkxGyM6Ab+13X+TJpBSDjIbDjtiNtDVtzXWJrU7PNG0FnvTv2BLCTUoiLshJMj3ugmbgD+f7g1MocJVgJqBVwEQA1v18iLYyLeMw6+bWk4iAT8GCK0cvAFEMAKYqcsrVU5mUWEblniWZT9J5vIQva7jmGYEPuuHBHFynL2Q; nseQuoteSymbols=[{"symbol":"TATACONSUM","identifier":null,"type":"equity"}]; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTY5MDM3NjE5NiwiZXhwIjoxNjkwMzgzMzk2fQ.liX0qdn000TB-lF9g-t_LotbLXkt_h-ltttubAbANsQ; _ga_PJSKY6CFJH=GS1.1.1690376183.108.1.1690376198.45.0.0; RT="z=1&dm=nseindia.com&si=d4b6ede0-bbc8-47e3-8269-561cca54c032&ss=lkjqbupb&sl=2&se=8c&tt=cg5&bcn=%2F%2F684dd331.akstat.io%2F&ld=ken&nu=eaogvpgq&cl=lu2"; bm_sv=EDDA093E6EF001E7EE20F6931E93B608~YAAQRjZ6XOb9io+JAQAAFeVFkhQhU1MVNlDQXwFD3uQqVQgv5fTIQyBJxu0MM/4OXdOP2XV58nG0TRG534LTPfd6KW3AtWjt3Pjgddl5i0K2oWATJOQ4i+r4Fvy9Sw/wG3WiIs6IRnzS6WuNBf8uGvlLTpAH6Uqrl02RqnJBAv608N1Tj+Z61Ihsr5bEWIsVCoRI39hEu1922SPW1MzPlMEmM48wtWvoMjYLJJk/P4ScglPkDuO7TyZ8r/0tRPTYH/5N~1',
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
    const apiKey = "0bpuke0rhsjgq3lm";
    const redirectUri = "http://localhost:3000/scanner";

    const login_url = `https://kite.zerodha.com/connect/login?api_key=${apiKey}&v=3`;

    open(login_url);
  });

  router.post("/exit",(req,res)=>{
    const type = req.body.trade.type;
    const order = req.body.trade.order;
    const triggerPrice = req.body.trade.triggerPrice;
    const pro = req.body.trade.pro;
    const quantity = req.body.trade.quantity;
    const symbol = req.body.trade.symbol;


    const orderParams = {
      exchange: "NSE",
      tradingsymbol: symbol,
      quantity: quantity,
      transaction_type: type,
      order_type: order,
      product: pro,
     
    };


    console.log(orderParams)

    kite
    .placeOrder("regular", orderParams)
    .then(function (response) {
      console.log(response);
     order_id =response.order_id
     console.log(order_id)

    
  }).catch(function (err) {
        console.error(err);
      });


})





  const updatedPnl={}
  router.post("/punch", (req, res) => {

    const type = req.body.trade.type;
    const order = req.body.trade.order;
    const triggerPrice = req.body.trade.triggerPrice;
    const pro = req.body.trade.pro;
    const quantity = req.body.trade.quantity;
    const symbol = req.body.trade.symbol;
    var stoploss = Number(req.body.trade.stopLoss)
    const squareoff = Number(req.body.trade.squareOff)
    const trailingStopPercentage = Number(req.body.trade.trailingSL)
    var currPrice = null;
    var avgPrice = 0;
    const stocks = {};
    const instrument=[]
    const instrumentData={}
    const finalPnl ={}
    const tradeId = uuidv4();
    let signalSent = false;
    let stopSendingData = false;
    var gttId = null;
    
    console.log('trailing',trailingStopPercentage)
  ; // Adjust this percentage as needed
    let highestPrice = 0;
    let currentTrailingStopPrice = null // Initial stop-loss price
     // Replace with your two-leg GTT trigger ID


    const roll =req.body.roll
    console.log(symbol, pro, order, type, quantity);
    console.log(stoploss,squareoff)
    const orderParams = {
      exchange: "NSE",
      tradingsymbol: symbol,
      quantity: quantity,
      transaction_type: type,
      order_type: order,
      product: pro,
     
    };
    console.log(orderParams)

    // if (triggerPrice) {
    //   orderParams.trigger_price = triggerPrice;
    // }
    
    
    kite
      .placeOrder("regular", orderParams)
      .then(function (response) {
        console.log(response);
       order_id =response.order_id
       console.log(order_id)
      
       kite.getOrderHistory(order_id)
        .then(function (response) {
          console.log(response);
          avgPrice = response[4].average_price;
          const quantity = response[4].quantity;
          const token = response[4].instrument_token
          res.send({tradeId,avgPrice});
          if (!stocks[symbol]) {
            stocks[symbol] = {
              symbol,
              token,
              avgPrice,
              quantity
            };
          }


          const gttParams = {
            trigger_type: 'two-leg',
            tradingsymbol: symbol,
            exchange: 'NSE',
            trigger_values: [stoploss,squareoff], 
            last_price: avgPrice, 
            orders: [
              {
                tradingsymbol: symbol,
                exchange: 'NSE',
                transaction_type: 'SELL',
                quantity: quantity,
                product: pro,
                order_type: 'MARKET',
                price: stoploss,
              },
              {
                tradingsymbol: symbol,
                exchange: 'NSE',
                transaction_type: 'SELL',
                quantity: quantity,
                product: pro,
                order_type: 'MARKET',
                price: squareoff,
              }
            ],
          };


          

          kite.placeGTT(gttParams)
          .then((targetGTTResponse) => {
            gttId=targetGTTResponse.trigger_id
            console.log("Target GTT Order Response:", targetGTTResponse);
            console.log(gttId)
            // Add any additional logic or handling for the target GTT order here
          })
          .catch((error) => {
            console.error("Error placing Target GTT Order:", error);
          });

    
        
          
        })
        .catch(function (err) {
          console.error(err);
        });

         
      })
      .catch(function (err) {
        console.error(err);
      });
                 
    const ticker = new KiteTicker({
      api_key: "0bpuke0rhsjgq3lm",
      access_token: access_token,
    });

      getQuote(["NSE:" + symbol]);

      function getQuote(instruments) {
        kite
          .getQuote(instruments)
          .then(function (response) {
            console.log(response);
            const token = response[instruments[0]].instrument_token;
            instrument.push(token)
            console.log('okkk')
            console.log(instrument)
            
            
    
            ticker.connect();
            ticker.on("ticks", onTicks);
            ticker.on("connect", subscribe);
           
            
            // ticker.on('disconnect', onDisconnect);
          })
          .catch(function (err) {
            console.log(err);
          });
      }  

      
    function sock (){
      console.log('hello')
      io.on("connection", (socket) => {
       
  
        console.log("Client connected");
  
        setInterval(()=>{
          pnlCal(symbol,socket)}, 2000);
  
        socket.on("disconnect", () => {
          console.log("Client disconnected");
        });
      });
  
    }

  

    
   sock()
   ticker.on('order_update', onTrade);

    function onTicks(ticks) {
      
      currPrice = ticks[0].last_price;
  
      
      ticks.forEach((tick) => {
        const instrumentToken = tick.instrument_token;
        const lastPrice = tick.last_price;
        const open = tick.ohlc.open

        const isTargetHit = lastPrice >= squareoff;
        const isStopLossHit = lastPrice <= stoploss;



        if ((isTargetHit || isStopLossHit) && !signalSent) {

          const hitType = isTargetHit ? 'target' : 'stopLoss';

          io.emit('tradeCompleted', { status: 'completed', tradeId: tradeId, tradeType: type, tradeSymbol: symbol ,hitType: hitType , roll:roll});
          signalSent = true
          stopSendingData = true;
          
          // ... (rest of your code)
        }

        
        if (lastPrice > highestPrice) {
        
          highestPrice = lastPrice;
          console.log(highestPrice)
        }

        const newTrailingStopPrice = highestPrice * (1 - trailingStopPercentage / 100);

        if (currentTrailingStopPrice === null) {
          // Initialize currentTrailingStopPrice on the first tick
          currentTrailingStopPrice = newTrailingStopPrice;
          stoploss=newTrailingStopPrice
        } else if (newTrailingStopPrice > currentTrailingStopPrice && !signalSent) {
          // Update the current trailing stop price only if it's initialized
          currentTrailingStopPrice = newTrailingStopPrice;
          stoploss=newTrailingStopPrice
          console.log(currentTrailingStopPrice)
          console.log('stoploss',stoploss);
          // Call a function to modify the stop-loss leg of the two-leg GTT order
          modifyGTTStopLoss(gttId, currentTrailingStopPrice);
        }
    
        // Update instrument data with the latest last price
        instrumentData[instrumentToken] = {
          open:open,
          lastPrice: lastPrice,
        };

  
      })

    

    }

    function modifyGTTStopLoss(gttId, newStopLossPrice) {
      // Define the modification parameters for the stop-loss leg
      const gttModificationParams = {
        trigger_id:gttId,
        trigger_type: 'two-leg',
        tradingsymbol: symbol,
        exchange: 'NSE',
        trigger_values: [newStopLossPrice,squareoff], 
        last_price: avgPrice, 
        orders: [
          {
            tradingsymbol: symbol,
            exchange: 'NSE',
            transaction_type: 'SELL',
            quantity: quantity,
            product: pro,
            order_type: 'MARKET',
            price: newStopLossPrice,
          },
          {
            tradingsymbol: symbol,
            exchange: 'NSE',
            transaction_type: 'SELL',
            quantity: quantity,
            product: pro,
            order_type: 'MARKET',
            price: squareoff,
          }
        
        ],
      };
      // Call the modifyGTT method to modify the stop-loss leg
      kite.modifyGTT(gttId, gttModificationParams)
      .then((Response) => {
        
        console.log("Response:",Response);
        // Add any additional logic or handling for the target GTT order here
      })
      .catch((error) => {
        console.error("Error placing Target GTT Order:", error);
      });; // You'll need to implement the modifyGTT function
    }


    function subscribe() {
      
      ticker.subscribe(instrument);
      ticker.setMode(ticker.modeFull, instrument);
  
    }

    function onTrade(order) {
      console.log("holaaadasd");
      console.log(order);
      
    
           
    }

    function onDisconnect(error) {
      console.log("Closed connection on disconnect", error);
    }



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


         
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    function pnlCal(symbol){
     
      if (Object.keys(stocks).length >0 && stocks[symbol]) {
      const token = stocks[symbol].token
      const quantity = stocks[symbol].quantity
     

      if( instrumentData[token]){
      
      
      const lastPrice = instrumentData[token].lastPrice
      const open = instrumentData[token].open

      const pnl = (lastPrice - avgPrice) * quantity;
          
      const day= ((lastPrice-open)/open)*100

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
    
    }

    updatedPnl[roll]=finalPnl
    
   

    if (!stopSendingData) {
    io.emit('holdings',updatedPnl)}
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
      api_key: "0bpuke0rhsjgq3lm",
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
