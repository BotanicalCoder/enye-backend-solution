const express = require("express");
const https = require("https");
const app = express();

app.use(express.json());

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
             res.json(currencyData);
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

app.listen(5000, () => console.log("listening on port" + 5000));
