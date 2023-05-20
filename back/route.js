const express =require('express')
const router = express.Router()
const mysql = require('mysql')
const db = require('./config/db')
const nodemailer = require('nodemailer');
var url = require('url');
const emailId='sidsigma3@gmail.com'
const pass='zsswervkokmbocgl'
const fs = require("fs");
const handlebars = require('handlebars');
const hbs = require('nodemailer-express-handlebars');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { error } = require('console');
const axios = require('axios');
const greeks = require("greeks");
const readline = require('readline');
const open = require('open')
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
const KiteConnect = require('kiteconnect').KiteConnect;
const KiteTicker = require('kiteconnect').KiteTicker;


const htmlTemplate = fs.readFileSync('C:/Users/sidsi/Desktop/intern/trade/src/components/WelocomeEmail.html', "utf8");
const resetEmail = fs.readFileSync('C:/Users/sidsi/Desktop/intern/trade/src/components/resetEmail.html','utf-8')
var access_token=null;

const cookieJar = new tough.CookieJar();





const sendEmail = async (recipient,userName) => {
    // create reusable transporter object using the default SMTP transport
   
   
    const source = htmlTemplate
    const template = handlebars.compile(source);
    const replacements = {
        username: userName,
        login_url:recipient
    };
    const htmlToSend = template(replacements);
      
   
   
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
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
      subject: 'Welcome Message',
      text: 'welcome , How you doing?',
      html:htmlToSend
     });
  
    console.log('Message sent: %s', info.messageId);
  };
  let loginAttempts = 0;

router.post('/login',(req,res)=>{
  
    const email =req.body.email
    const password=req.body.password
    
    // check if the user has attempted to login 3 times
    if (loginAttempts >= 3) {
        res.json({
            stat: 401,
            msg: "You have exceeded the maximum number of login attempts. Please wait for 3 minute or try forgot password."
        });
        setTimeout(() => {
          loginAttempts = 0;
      }, 60000);
      return;
      
    }

    db.query('SELECT * FROM login.user WHERE email=? AND password=?',[email,password],(err,result)=>{
        if (err){
            console.log(err)
            res.json({
                stat:500,
                msg:"Server error"
            })
        }
        else{
            if (result.length>0){
               
                loginAttempts = 0;
                res.json({
                    stat:200,
                    msg:"Sucessfully entered website"
                })
            }
            else{
               
                loginAttempts++;
                res.json({
                    stat:201,
                    msg:"Email and password doesn't match you have, "+(4-loginAttempts)+" more attempts left"
                })
            }
        }
    })


})

router.post('/signup',(req,res)=>{
console.log(req.body)

const firstName = req.body.fname;
const LastName = req.body.lname;
const userName = req.body.username;
const email = req.body.email;
const password=req.body.password;
const repassword=req.body.rePassword;
const phoneNumber=req.body.phone;

const fullName=firstName+" "+LastName

db.query('SELECT * FROM login.user WHERE email=? ',[email],(err,result)=>{
    if (err){
        console.log(err)
    }
    else{
        if (result.length>0){

            res.json({
                stat:201,
                msg:"user already registered"
            })
        
        }

        else{
            
                console.log(phoneNumber)
                db.query("INSERT INTO login.user (fullName, userName, email,password,phoneNumber) VALUES (?,?,?,?,?)",[fullName,userName,email,password,phoneNumber], (err,resu)=>{
                    if(err) {
                    console.log(err)
                    }
                    else{
                        res.json({
                            stat:200,
                            msg:"Succesfully Registered"
                        })

                        sendEmail(email,userName)
                    }
                 }) 
            
           
        }
    }
}

)

 

}
 )


 router.post('/reset',(req,res)=>{
    
  const email =req.body.email
  
  const token = jwt.sign({ email }, 'your-secret-key', { expiresIn: '1h' });

 
  db.query('INSERT INTO password_reset_tokens (email, token) VALUES (?, ?)', [email, token], (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal server error');
      return;
    }


    const resetLink = `http://localhost:3000/pass?email=${email}&token=${token}`;
    
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
          user: emailId,
          pass: pass,
        },
      });
    
    let mailOptions = transporter.sendMail( {
      from: 'sidsigma3@gmail.com',
      to: email,
      subject: 'Password reset request',
      html: `<p>You have requested a password reset for your account. Please click the following link to reset your password:</p><p><a href="${resetLink}">${resetLink}</a></p>`
    }).then(res.json({
      stat:200,
      msg:"Succesfully Registered"})
);

    
   
});

  
 })

 router.post('/change',(req,res)=>{
    const email=req.body.Email
    const password = req.body.pass
    const repass=req.body.repass

  

if (password!==repass){
    res.status(402)
}

  db.query('UPDATE login.user SET password = ? WHERE email = ?', [password,email], (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal server error');
      
    } 
    
    else{
        db.query('DELETE FROM password_reset_tokens WHERE email = ?', [email], (error, results, fields) => {
            if (error) {
              console.error(error);
            }
        
            // res.status(200).send('Password changed successfully.');

            const source = resetEmail
            const template = handlebars.compile(source);
            const replacements = {
                // username: "",
                // login_url:recipient
            };
            const emailToSend = template(replacements);
            
            let transporter = nodemailer.createTransport({
              host: 'smtp.gmail.com',
              port: 465,
              secure: true, // use SSL
              auth: {
                user: emailId,
                pass: pass,
              },
            });

            let info = transporter.sendMail({
              from: emailId,
              to: email,
              subject: 'Your password has been changed',
    
              html:emailToSend
             }).then(res.status(200).send('successfull'));
          

    })
    
 }})

 })

 router.post('/check',(req,res)=>{

    
    const {email,token}=req.body

 
    
    db.query('SELECT * FROM password_reset_tokens WHERE email = ? AND token = ?', [email, token], (error, results, fields) => {
       
        if (error) {
          console.error(error);
          res.status(500).send('Internal server error');
          return;
        }
    
        if (results.length === 0) {
         
          res.status(400).send('Invalid or expired token');
          return;
        }

        else{
         
            res.status(200).json({msg:true})
        }
 })
})



const secret ='e9jpxrsvft5jkzxpzqys62g3e5slfagn'
const apiKey = 'thxudf2o662hgrk5';
const kite = new KiteConnect({
  api_key: apiKey
})



router.post('/api/stock', async (req, res) => {
  const symbol = req.body.symbol
  const expiryDate = req.body.date
  const requestToken = req.body.requestToken
  console.log(requestToken)
  
  

  

  const connectKite= async ()=>{
    try {
       
        const response = await kite.generateSession(requestToken, secret);
        access_token = response.access_token;
        await kite.setAccessToken(access_token);
       
    } catch (error) {
        console.error(error)
    }
}
if (!access_token){
  await connectKite()
}

getQuote(["NSE:RELIANCE"]);

function getQuote(instruments) {
  kite.getQuote(instruments).then(function(response) {
    console.log(response);
  }).catch(function(err) {
    console.log(err);
  })
}


})


  

  


 




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

  
  // function generateSession() {
  //   return new Promise((resolve, reject) => {
  //     kite.generateSession(requestToken, secret)
  //       .then((response) => {
  //         const access_token = response.access_token;
  //         console.log('Access Token:', access_token);
  //         kite.setAccessToken(access_token);
  //         resolve(access_token);
  //       })
  //       .catch((err) => {
  //         console.error('Error generating session:', err);
  //         reject(err);
  //       });
  //   });
  // }
  
  // async function initializeTicker() {
  //   try {
  //     if (access_token===null){
  //     access_token = await generateSession();
  //     console.log()
  //   }
  //   else{
  //     axios.post('')
  //   }


  //     const ticker = new KiteTicker({
  //       api_key: apiKey,
  //       access_token: access_token
  //     });
  
  //     function onTicks(ticks) {
  //       console.log('Ticks', ticks);
  //     }
  
  //     function subscribe() {
  //       const instrumentTokens = [738562];
  //       ticker.subscribe(instrumentTokens);
  //       ticker.setMode(ticker.modeFull, instrumentTokens);
  //     }

  //     function onDisconnect(error) {
  //       console.log("Closed connection on disconnect", error);
  //     }
      
  //     function onError(error) {
  //       console.log("Closed connection on error", error);
  //     }
      
  //     function onClose(reason) {
  //       console.log("Closed connection on close", reason);
  //     }
      
  //     function onTrade(order) {
  //         console.log("Order update", order);
  //     }
  

  //     function getQuote(instruments) {
  //       kite.getQuote(instruments).then(function(response) {
  //         console.log(response);
  //       }).catch(function(err) {
  //         console.log(err);
  //       })
  //     }
      

  //     ticker.connect();
  //     ticker.on('ticks', onTicks);
  //     ticker.on('connect', subscribe);
  //     ticker.on('disconnect', onDisconnect);
  //     ticker.on('error', onError);
  //     ticker.on('close', onClose);
  //     ticker.on('order_update', onTrade);

  //     getQuote(["NSE:RELIANCE"]);

  //   } catch (err) {
  //     console.error('Error initializing ticker:', err);
  //   }
  // }
  


  
  // async function generateSession() {
  //   try {
  //     const response = await kite.generateSession(requestToken, secret)
  //     .then((response)=>{
  //       console.log(response)
  //       console.log(response.access_token)
  //       const access_token = response.access_token;
  //       console.log('Access Token:', access_token);
  //       kite.setAccessToken(access_token);
  //       return access_token;
  //     }
  //     )
  //     .catch((err)=>{
  //       console.log(err)
  //     })
     
     
  //   } catch (err) {
  //     console.error('Error generating session:', err);
  //     throw err;
  //   }
  // }
  
  // async function initializeTicker() {
  //   // const access_token = await generateSession();
  //   const ticker = new KiteTicker({
  //     api_key: apiKey,
  //     access_token: ' 235abzrfe4jKxALtyUJaMLhMZJyZw01J'
  //   });
    
  //   function onTicks(ticks) {
  //     console.log('Ticks', ticks);
  //   }
    
  //   function subscribe() {
  //     const instrumentTokens = [738562];
  //     ticker.subscribe(instrumentTokens);
  //     ticker.setMode(ticker.modeFull, instrumentTokens);
  //   }
    
  //   ticker.connect();
  //   ticker.on('ticks', onTicks);
  //   ticker.on('connect', subscribe);
  // }
  
  // initializeTicker();

  // kite.generateSession(requestToken, secret)
  // .then((response) => {
  //   const access_token = response.access_token;
  //   console.log(response);
  //   kite.setAccessToken(access_token);
  
  //   const ticker = new KiteTicker({
  //     api_key: apiKey,
  //     access_token: access_token
  //   });

  //   function onTicks(ticks) {
  //     console.log('Ticks', ticks);
  //   }

  //   function subscribe() {
  //     const instrumentTokens = [738562];
  //     ticker.subscribe(instrumentTokens);
  //     ticker.setMode(ticker.modeFull, instrumentTokens);
  //   }

  //   ticker.connect();
  //   ticker.on('ticks', onTicks);
  //   ticker.on('connect', subscribe);

  // })
  // .catch((err) => {
  //   console.error('Error generating session:', err);
  // });


  // const ticker = new KiteTicker({
  //   api_key: apiKey,
  //   access_token: access_token
  // });
  
  // function onTicks(ticks) {
  //   console.log('Ticks', ticks);
  // }
  
  // function subscribe() {
  //   const instrumentTokens = [738562];
  //   ticker.subscribe(instrumentTokens);
  //   ticker.setMode(ticker.modeFull, instrumentTokens);
  // }

  // ticker.connect();
  // ticker.on('ticks', onTicks);
  // ticker.on('connect', subscribe);

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
 

router.post('/calculate-greeks', (req, res) => {
  const apiKey='OOT5PNL8EV6DJ5J8'
  const symbol = req.body.symbol
  const expiryDate = req.body.date
 
  
  const optionChain = {
    calls: [],
    puts: [],
    spotPrice:''
  };
  
  const url = `https://opstra.definedge.com/api/openinterest/optionchain/free/${symbol}&${expiryDate}`;



  axios.get(url
    ,{
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      // 'Referer': 'https://www.nseindia.com/',
      cookie:'_ga=GA1.2.1370922286.1680970843; _gid=GA1.2.1557409501.1684570172; _gat=1; JSESSIONID=54CEE061F9423F043EBD80E69CF08C1B',
      'X-Requested-With': 'XMLHttpRequest',
      'Connection': 'keep-alive',
    }
  }
  )
  .then(response => {
    const { data } = response;
   
  
    data.data.map((option)=>{
       
      const callGreeksData ={
       gamma :option.CallGamma,
       vega :option.CallVega,
       theta :option.CallTheta,
       delta : option.CallDelta,
       strikePrice : option.StrikePrice,
       iv : option.CallIV

      }

      optionChain.calls.push(callGreeksData)
      const putGreeksData = {


       gamma : option.PutGamma,
       vega :option.PutVega,
       theta : option.PutTheta,
       delta :option.PutDelta,
       strikePrice : option.StrikePrice,
       iv :  option.PutIV,

      }

      optionChain.puts.push(putGreeksData)


    })

   res.send(optionChain)
  })
  .catch(error => console.error(error));


});

router.post('/oi-changes', (req, res) => {
  const symbol = req.body.symbol

  
  const expiryDate = req.body.date
  
  const url1=`https://www.nseindia.com/api/option-chain-equities?symbol=${symbol}&date=${expiryDate}`

  const url2=`https://www.nseindia.com/api/option-chain-indices?symbol=${symbol}`

  let url =null;
  if (symbol==='NIFTY'){
    url=url2
  }
  else{
    url=url1
  }

   axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Referer': 'https://www.nseindia.com/',
      cookie:'defaultLang=en; _ga=GA1.1.1973558800.1680625735; nsit=hXTyxKwwkw8oIAs2JBG0QIG8; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTY4NDU3MDExMywiZXhwIjoxNjg0NTc3MzEzfQ.sjpvcLE5QUjIphLIqbaU_lE_0ADF1Txe5Kp5CEO1kJw; AKA_A2=A; ak_bmsc=CC3C37F4B6031F72A57BF6A3E6CFE0F1~000000000000000000000000000000~YAAQr4gsMXubDwGIAQAA+BU0OBPSKHVwJgM3YoIufy7znQxlK66jtEIrA3u+w+8SZjKLznfcg6Ds/2lLjgypfuiF9uIM+0uXJZScTVefJD2TkxXQ+ZqCQzfebWUwZnkJwcc09gIeOj+m8G08rSLTuL411BwWDHao4MqGXEswhQla4vNkm406mvazK5iHON6bKw00uvA96iouyxe46uwgW88nPmG81CeiSNbajeNA/sFFbM7Qo5zsFGZN8C0hRDNVePgL2OEbg7kwN4UNwAAlXcMTA0Qiotg4NUyGSDgPuI04bC8f4yXc4YAa2X4Gf3LuTiMnwCkt/0lwSuusq8PGN24wto+6RaQ+2RQkVXFEZWCWa8FrHFELWeuSr9z7E2bxMHsiIDY66fKI4PGbRNzc5hcd3PI+0us7DGhsGjNTEiEcFDWKNXMHhBj9WRdQotdv6K77txXVluZ12Gy4Rjba9/cbrDipSAX1+EnB5iZaHjgtYjLlGddk30ZQDOBO; RT="z=1&dm=nseindia.com&si=0739144a-b036-4da5-82fa-14290217cb34&ss=lhq314l7&sl=0&tt=0&se=8c&bcn=//684d0d43.akstat.io/&nu=de6o9i2j&cl=5mith1"; _ga_PJSKY6CFJH=GS1.1.1684570114.97.1.1684570118.56.0.0; bm_sv=B049DF162765869B975BBDC12E423C34~YAAQr4gsMYSbDwGIAQAA4Bc0OBO2V5lRagAHknBtmpOGg2DmRENzfH+2/r2EH/OEzybNKVx7XsH+7b41ddo51DJeAfXSifxenv/8JuANQ9+BTVfQwNHgk3TD/u0bh7hsasQeRgapWKeKIn0IDf/+9rTcLKAjdPAdTLOH6Sb09x/iT3pLnUGXwGjhQgFUglhMXDKMlQ0v71hhd0cKCbGnQT+QDb6dQNqqkz6qN8jVGXd4nRREjmmU9REHSpELrEZDCD8=~1',
      'X-Requested-With': 'XMLHttpRequest',
      'Connection': 'keep-alive',
    }
  })
  .then((response) => {
   
    const { data } = response;
    const filteredData = data.filtered.data

    const optionChain = {
      calls: [],
      puts: [],
      pcr:[]
    };

    filteredData.forEach(option => {
      const callOption = {
      strikePrice:option.CE?.strikePrice,
      expiryDate:option.CE?.expiryDate,
      underlying:option.CE?.underlying,
      lastPrice:option.CE?.lastPrice,
      openInterest:option.CE?.openInterest,
      changeinOpenInterest:option.CE?.changeinOpenInterest,
  
      };
     
      const putOption = {
        strikePrice:option.PE?.strikePrice,
        expiryDate:option.PE?.expiryDate,
        underlying:option.PE?.underlying,
        lastPrice:option.PE?.lastPrice,
        openInterest:option.PE?.openInterest,
        changeinOpenInterest:option.PE?.changeinOpenInterest,


        };
        optionChain.calls.push(callOption);
        optionChain.puts.push(putOption);

        const ratio = ((option.PE?.openInterest+0.5)/(0.5+option.CE?.openInterest))

        optionChain.pcr.push(ratio) 


         
    });    
    console.log(optionChain)
    res.send(optionChain)
      
  }).catch((error) => {
    console.error(error);
    res.status(500).send('Server Error');
  })

})


router.post('/max-pain', (req, res) => {
  const symbol = req.body.symbol

  
  const expiryDate = req.body.date
  

  const url1=`https://www.nseindia.com/api/option-chain-equities?symbol=${symbol}`
          
  const url2=`https://www.nseindia.com/api/option-chain-indices?symbol=${symbol}`

  let url =null;
  if (symbol==='NIFTY'){
    url=url2
  }
  else{
    url=url1
  }


   axios.get(url, 
    {withCredentials: true,
      jar: cookieJar,
      headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
          'Accept-Language': 'en-US,en;q=0.9',
          'Accept-Encoding': 'gzip, deflate, br',
          'Referer': 'https://www.nseindia.com/',
          cookie:'defaultLang=en; _ga=GA1.1.1973558800.1680625735; nsit=hXTyxKwwkw8oIAs2JBG0QIG8; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTY4NDU3MDExMywiZXhwIjoxNjg0NTc3MzEzfQ.sjpvcLE5QUjIphLIqbaU_lE_0ADF1Txe5Kp5CEO1kJw; AKA_A2=A; ak_bmsc=CC3C37F4B6031F72A57BF6A3E6CFE0F1~000000000000000000000000000000~YAAQr4gsMXubDwGIAQAA+BU0OBPSKHVwJgM3YoIufy7znQxlK66jtEIrA3u+w+8SZjKLznfcg6Ds/2lLjgypfuiF9uIM+0uXJZScTVefJD2TkxXQ+ZqCQzfebWUwZnkJwcc09gIeOj+m8G08rSLTuL411BwWDHao4MqGXEswhQla4vNkm406mvazK5iHON6bKw00uvA96iouyxe46uwgW88nPmG81CeiSNbajeNA/sFFbM7Qo5zsFGZN8C0hRDNVePgL2OEbg7kwN4UNwAAlXcMTA0Qiotg4NUyGSDgPuI04bC8f4yXc4YAa2X4Gf3LuTiMnwCkt/0lwSuusq8PGN24wto+6RaQ+2RQkVXFEZWCWa8FrHFELWeuSr9z7E2bxMHsiIDY66fKI4PGbRNzc5hcd3PI+0us7DGhsGjNTEiEcFDWKNXMHhBj9WRdQotdv6K77txXVluZ12Gy4Rjba9/cbrDipSAX1+EnB5iZaHjgtYjLlGddk30ZQDOBO; RT="z=1&dm=nseindia.com&si=0739144a-b036-4da5-82fa-14290217cb34&ss=lhq314l7&sl=0&tt=0&se=8c&bcn=//684d0d43.akstat.io/&nu=de6o9i2j&cl=5mith1"; _ga_PJSKY6CFJH=GS1.1.1684570114.97.1.1684570118.56.0.0; bm_sv=B049DF162765869B975BBDC12E423C34~YAAQr4gsMYSbDwGIAQAA4Bc0OBO2V5lRagAHknBtmpOGg2DmRENzfH+2/r2EH/OEzybNKVx7XsH+7b41ddo51DJeAfXSifxenv/8JuANQ9+BTVfQwNHgk3TD/u0bh7hsasQeRgapWKeKIn0IDf/+9rTcLKAjdPAdTLOH6Sb09x/iT3pLnUGXwGjhQgFUglhMXDKMlQ0v71hhd0cKCbGnQT+QDb6dQNqqkz6qN8jVGXd4nRREjmmU9REHSpELrEZDCD8=~1',
          'X-Requested-With': 'XMLHttpRequest',
          'Connection': 'keep-alive',
        }
  })
  .then((response) => {
    const { data } = response;
    const expiries = data.records.expiryDate;
    const filteredData = data.filtered.data

    const callPain=[]
    const putPain=[]


    
    
    let maxpain = [];
   filteredData.forEach((option,index)=>{
    const strikePrice = option.CE?.strikePrice
   
    const slicedEntries = Object.entries(filteredData).slice(0,index)

    
    let pain=0
    slicedEntries.forEach(option=>{
        
        const callOi=option[1].CE?.openInterest
     
        const strikeP=option[1].CE?.strikePrice

        const difference = strikePrice-strikeP
        pain = pain + (callOi*difference)


    })

    callPain.push(pain)

   })

  const keys = Object.keys(filteredData);
  for (let i = keys.length - 1; i >= 0; i--) {
    const key = keys[i];
    const value = filteredData[key];
    const strikePrice=filteredData[key].PE?.strikePrice

    const slicedEntries = Object.entries(filteredData).slice(i,keys.length)
    let pain=0
    slicedEntries.forEach(option=>{
        
        const putOi=option[1].PE?.openInterest
        const strikeP=option[1].PE?.strikePrice

        const difference = Math.abs(strikePrice-strikeP)
        pain = pain + (putOi*difference)


    })

    putPain.push(pain)

  }
  

    const pPain=putPain.reverse()
    
    filteredData.forEach((option, index) => {
     
      const result = {
        strikePrice:option.CE.strikePrice,
        maxPain:(callPain[index]+pPain[index])*(75)
      }

      maxpain.push(result)

    })
     
   
  console.log(maxpain)
   res.send(maxpain) 
  }).catch((error) => {
    console.error(error);
    res.status(500).send('Server Error');
  })

})


router.post('/kite',(req,res)=>{
  
  const apiKey = 'thxudf2o662hgrk5';
  const redirectUri = 'http://localhost:3000/scanner';

 
  const login_url = `https://kite.zerodha.com/connect/login?api_key=${apiKey}&v=3`;

  open(login_url)  

})


module.exports = router