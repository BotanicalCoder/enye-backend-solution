const express = require("express");
const https = require("https");
const app = express();

const port = process.env.PORT || 3111;
app.use(express.json());

app.get("/",  (req, res) => { res.send('welcome to my solution')}
app.get("/api/rates", (req, res) => {
  
  if (req.query.base !== null || "") {
    let str = '';
    let currencyData ;
    https
      .get(
        `https://api.exchangeratesapi.io/latest?base=${req.query.base}&symbols=${req.query.currency}`,
        (resp) => {
         resp.on('data',(d)=>{
           
           str += d;
           
         });
         resp.on('end', async ()=>{    
             currencyData = await JSON.parse(str);
             
             res.json({results:currencyData, base:req.query.base, date:currencyData.date, rates:{currency:req.query.currency}, });
        })
          
        }
      )
      .on("error", (err) => {
        console.log(err);
      });
      
      
  } else {
    res.status(422).send("no base url is given");
  }
});

app.listen(5000, () => console.log("listening on port" + port));
