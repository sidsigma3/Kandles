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

const htmlTemplate = fs.readFileSync('C:/Users/sidsi/Desktop/intern/trade/src/components/WelocomeEmail.html', "utf8");
const resetEmail = fs.readFileSync('C:/Users/sidsi/Desktop/intern/trade/src/components/resetEmail.html','utf-8')




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
  
    // const email =req.body.email
    // const password=req.body.password
    

    // db.query('SELECT * FROM login.user WHERE email=? AND password=?',[email,password],(err,result)=>{
    //     if (err){
    //         console.log(err)
    //     }
    //     else{
    //         if (result.length>0){
    //             res.json({
    //                 stat:200,
    //                 msg:"sucessfully entered website"
    //             })
    //         }
    //         else{
    //         res.json({
    //             stat:201,
    //             msg:"Email and password doesn't match"
    //         })
    //     }
    //     }
    // })

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
                // reset the login attempts if the user enters correct credentials
                loginAttempts = 0;
                res.json({
                    stat:200,
                    msg:"Sucessfully entered website"
                })
            }
            else{
                // increment the login attempts if the user enters wrong credentials
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
  // Generate a unique token
  const token = jwt.sign({ email }, 'your-secret-key', { expiresIn: '1h' });

  // Store the token and email address in the database
  db.query('INSERT INTO password_reset_tokens (email, token) VALUES (?, ?)', [email, token], (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal server error');
      return;
    }


    // Send an email with the password reset link
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


router.post('/api/stock', (req, res) => {
  const symbol = req.body.symbol

  apiKey='OOT5PNL8EV6DJ5J8'
  const expiryDate = req.body.date
  
  // const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

  // const url = `https://www.alphavantage.co/query?function=OPTION&symbol=${symbol}&date=2023-04-13&datatype=json&apikey=${apiKey} `

  const url=`https://www.nseindia.com/api/option-chain-equities?symbol=${symbol}&date=${expiryDate}`

  // const url=`https://www.nseindia.com/api/option-chain-indices?symbol=${symbol}`

  // const url = `https://query1.finance.yahoo.com/v7/finance/options/${symbol}`;

  // const url =`https://opstra.definedge.com/api/v1/option-chain?symbol=${req.body.symbol}`
   axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Referer': 'https://www.nseindia.com/',
      cookie:'defaultLang=en; JSESSIONID=980F5B8DE26AEBBC2E20A3A34559975C.jvm1; _gid=GA1.2.103240614.1681968394; _ga=GA1.1.1973558800.1680625735; nseQuoteSymbols=[{"symbol":"NIFTY","identifier":"OPTIDXNIFTY20-04-2023CE17700.00","type":"equity"},{"symbol":"ITC","identifier":null,"type":"equity"},{"symbol":"HCLTECH","identifier":null,"type":"equity"}]; nsit=AhldP5XJhl-R_dZXusQtr_Aq; bm_mi=1ACC7CBCC02FF96F58D7723B8157989B~YAAQyd44fYWA2p2HAQAA3VZRnxONdOkvvjqMa2YXJAK9Yop5kwB1GwZIxXxhMZTKUJU8wcGacENGMe7JIdwuCUjq1M3hgbvleTM3/IVmTWChOY3HbKsiKziViA59c+0KaMYP/yulsmRkn1XaioHfX4OQoikxiSOMWn3c403G6xjoAsKJa4fullHtEKmhYTeW/8fFCofAqTAMAKt6wsKwGEBghVXkgVbYg3sUsxD1UobtTz5wtjNIuJKNqCG0QYoQnpoehnMcJEzwDWGt2sJ3NOiGQlY0gsjiZQmIooOqNHNqWDxci/qGo8KzGub8lqNtbVgO1hX2Ct/riUgpI+CT4qCVRh0P/Q==~1; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTY4MjAwNTEyMywiZXhwIjoxNjgyMDEyMzIzfQ.KLpU-JZcfWqdnUD5SQWIJH-PeoSdKc5AEcX_1XFtTK0; AKA_A2=A; _ga_PJSKY6CFJH=GS1.1.1682004607.54.1.1682005125.36.0.0; ak_bmsc=48D7B63AF24B44B240F0572BE5022F32~000000000000000000000000000000~YAAQyd44fRGB2p2HAQAA/W1RnxPrz7rCxL4n+pqqOCWwp7fXJ9iRJkLAdgq8w3HFZLpLMxiJtMDNFq0CtebtB2w6kLqon2Tuxih+7UBBKa1iYsWYaaI6l4vGqvyvEbG6+7f++SWnFvRWRgbqGgsSzvKEB/xfCbXRx9QYvXd9tuqmabg+eEI6AvlGA9pu9vey58Mg8hK4Fnz/+JaZsSvlEPIM9KT1T75AEWpZNYlvwZNp92MeyCouJQarw9K839bGe6PYUMVQNiQIhJZ+6UM4w2tSnUR76ftdbYSkknS7s6yD+q0o1/48i8XTzE9dbfmgjXp4qOncFnVnggmzYU58SXP3UbiIiquFcE5eVEHcNoDzqEgR1oeijFV1es+7+LkcwuJFX+40ibCUq6MnOmtV7CmXYmAWOv+HaRTkfWTXwhLgsFmwFz7AzAY+7yJq6L3S03sCSyQ=; RT="z=1&dm=nseindia.com&si=0739144a-b036-4da5-82fa-14290217cb34&ss=lgpaesl3&sl=1&tt=1xk&bcn=//17de4c18.akstat.io/&nu=umi9x3gn&cl=htm&ld=hvc"; bm_sv=7284BF5D5FA80F742ABE0A8177E575EF~YAAQyd44fS+B2p2HAQAA+HBRnxMMoK/wL3S/tsq/L8wRf236L4t1/PmoSB6uKJ1DGdOy/eUn4k3dqA6Ex+6EGmxQO/k9dy0Hn5bJs0shtpVQ0YSnNHXcnp1eN8ElefIrrzjQ3gZLgumRvxd2sryKiIAztUJHQylT3+D60I5g6IqNviza4P8Rkk3Q/ixcio5WRhab+L1co/wiQAc9uHxvq0VxScAhVLi9uDCg4MjqhuQEhCQlD1vXX9jvXzO3SDNbLnrM~1',
      'X-Requested-With': 'XMLHttpRequest',
      'Connection': 'keep-alive',
    }
  })
  .then((response) => {
    const { data } = response;
    const expiries = data.records.expiryDates;
    console.log(data)
    const filteredData = data.filtered.data.filter(option => option.expiryDate === expiryDate);
    console.log(filteredData);
    console.log(expiries)
  
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
        console.log(optionChain)
    res.send(optionChain)
      
  }).catch((error) => {
    console.error(error);
    res.status(500).send('Server Error');
  })

})
 

router.post('/calculate-greeks', (req, res) => {
  const apiKey='OOT5PNL8EV6DJ5J8'
  const symbol = req.body.symbol
  const expiryDate = req.body.date
 
  
  const optionChain = {
    calls: [],
    puts: [],
    spotPrice:''
  };

  
  // const url=`https://www.nseindia.com/api/option-chain-equities?symbol=${symbol}`

  // const url='https://opstra.definedge.com/api/openinterest/optionchain/free/${symbol}&${expiryDate}'
  
  const url = `https://opstra.definedge.com/api/openinterest/optionchain/free/${symbol}&${expiryDate}`;



  axios.get(url
    ,{
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      // 'Referer': 'https://www.nseindia.com/',
      cookie:'_ga=GA1.2.1370922286.1680970843; JSESSIONID=870AEF040EA14F25DF8C5A23B84936A7; _gid=GA1.2.1006338812.1682004775; _gat=1',
      'X-Requested-With': 'XMLHttpRequest',
      'Connection': 'keep-alive',
    }
  }
  )
  .then(response => {
    const { data } = response;
    // console.log(data)
    // const filteredData = data.filtered.data.filter(option => option.expiryDate === expiryDate);
    // optionChain.spotPrice=data.records.underlyingValue
  
    data.data.map((option)=>{
      console.log(option)     
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


    
    // filteredData.map((option)=>{
    //   const underlyingPrice = option.CE?.underlyingValue
    //   const strikePrice =option.CE?.strikePrice
    //   const timeToExpiration = 9 / 365; // time to expiration in years
    //   const callVolatility =option.CE?.impliedVolatility
    //   const putVolatility =option.PE?.impliedVolatility
    //   const riskFreeInterestRate=0.1

    //   const callDelta = greeks.getDelta(underlyingPrice, strikePrice, timeToExpiration, riskFreeInterestRate ,callVolatility,'call');
    //   const callGamma = greeks.getGamma(underlyingPrice, strikePrice, timeToExpiration, riskFreeInterestRate ,callVolatility,'call');
    //   const callVega = greeks.getVega(underlyingPrice, strikePrice, timeToExpiration, riskFreeInterestRate ,callVolatility,'call')
    //   const callTheta = greeks.getTheta(underlyingPrice, strikePrice, timeToExpiration, riskFreeInterestRate ,callVolatility,'call')
  
    //   const callGreeksData={
    //     delta:callDelta.toFixed(2),
    //     gamma:callGamma.toFixed(2),
    //     vega:callVega.toFixed(2),
    //     theta:callTheta.toFixed(2),
    //     iv:callVolatility,
    //     strikePrice:strikePrice
       
    //   }
    //   optionChain.calls.push(callGreeksData)
  
    //   const putDelta = greeks.getDelta(underlyingPrice, strikePrice, timeToExpiration, riskFreeInterestRate ,putVolatility,'put');
    //   const putGamma = greeks.getGamma(underlyingPrice, strikePrice, timeToExpiration, riskFreeInterestRate ,putVolatility,'put');
    //   const putVega = greeks.getVega(underlyingPrice, strikePrice, timeToExpiration, riskFreeInterestRate ,putVolatility,'put');
    //   const putTheta = greeks.getTheta(underlyingPrice, strikePrice, timeToExpiration, riskFreeInterestRate ,putVolatility,'put')
      
      
    //   const putGreeksData={
    //     delta:putDelta.toFixed(2),
    //     gamma:putGamma.toFixed(2),
    //     vega:putVega.toFixed(2),
    //     theta:putTheta.toFixed(2),
    //     iv:putVolatility,
    //     strikePrice:strikePrice
        
    //   }


    //   optionChain.puts.push(putGreeksData)
        
    // })
  
    // console.log(optionChain)
   res.send(optionChain)
  })
  .catch(error => console.error(error));


});



module.exports = router