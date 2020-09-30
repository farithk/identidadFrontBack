import React, { useState, useEffect } from "react";
import axios from 'axios';

import { db } from "./firebase";

import './App.css';


const Dashboard = () => {

    const [user, setUser] = useState({});
    let [lugares, setLugares] = useState();
    let [sensoresN, setSensoresN] = useState();
    const [lugarSelec, setLugarSelec] = useState();

  
    const getSensors = async () => {
      var first = db.collection("sensors")
          
          return first.get().then(function (documentSnapshots) {
            // Get the last visible document

            const docs = [];
            documentSnapshots.forEach((doc) => {
              console.log(doc.data());
              docs.push({ ...doc.data(), id: doc.id });
            });
            
            setSensoresN(docs);


          });
      };

    const getPlaces = async () => {
      var first = db.collection("lugares")
          
          .limit(4);
  
          return first.get().then(function (documentSnapshots) {
            // Get the last visible document
  
            const docs = [];
            documentSnapshots.forEach((doc) => {
              //console.log(doc.data());
              docs.push({ ...doc.data(), id: doc.id });
            });
            
            setLugares(docs);
  
  
          });
      };

      //console.log(lugares);



    const handleAdd = (e) => {
      // console.log(e.target.id);
      
      // console.log(sensoresN.length);

      
      let s = (sensores[e.target.id].split(','));
      let actualS = [];
      for (let i = 0; i < s.length;i++){
        //console.log(s[i].split('#')[1])
        
          if (s[i].split('#')[1] != undefined){
            actualS.push(+s[i].split('#')[1])
          }
          
      }

  
   
    actualS.push(sensoresN.length + 1);

    console.log(actualS);
    
    
    let lugar = (e.target.id).split(' ').join('');
    let content = {
      nombre: e.target.id,
      sensores: actualS
    }
    addOrEditLink(lugar, content);

    let sensoresQty = "sensor" + (sensoresN.length + 1);
    let contentSensors = {
      "humedad": 0,
      "nombre": sensoresQty,
      "temperatura": 0
    }
    addOrEditLinkSensors(sensoresQty, contentSensors);
  }
 
  const addOrEditLink = async (lugar, content) => {
    try {
      //console.log("Before")
      await db.collection("lugares").doc(lugar).set(content);
      console.log("Done!! Add");
      getPlaces();
      
    } catch (error) {
      console.error(error);
    }
  };

  const addOrEditLinkSensors = async (sensor, content) => {
    try {
      //console.log("Before")
      await db.collection("sensors").doc(sensor).set(content);
      console.log("Done!! Add");
      getPlaces();
      getSensors();
      
    } catch (error) {
      console.error(error);
    }
  };
  //addOrEditLink(message);

  const handlePlace = (e) => {
    console.log(e.target.id);
    setLugarSelec(e.target.id);
  }

  const handleDelete = (e) => {

    console.log(e.target.id)
    console.log(sensores[e.target.id])
    let s = (sensores[e.target.id].split(','));
    let actualS = [];
    for (let i = 0; i < s.length;i++){
      //console.log(s[i].split('#')[1])
      actualS.push(+s[i].split('#')[1])
    }
  
    for(let j =0; j < actualS.length; j++){
      console.log("sensor"+actualS[j]);
      //deleteLink("sensor"+actualS[j]);
      let lugar = (e.target.id).split(' ').join('');
      let content = {
       nombre: e.target.id,
       sensores: []
     }
      addOrEditLink(lugar, content);
    }
  }

  let rows;

    let sensores = {};

    if (lugares){
      
      rows =  Object.keys(lugares).map(function(keyName, keyIndex) {
        
        for(let i = 0; i < 4; i++){
          let word = "sensores: ";
          for(let j = 0; j < lugares[keyName].sensores.length; j++){
            if (j < lugares[keyName].sensores.length - 1) {
              word = word + "Sensor #" + lugares[keyName].sensores[j] + ', ' ;
            } else {
              word = word + "Sensor #" + lugares[keyName].sensores[j];
            }
           
          }
          
          sensores[lugares[keyName].nombre] = word;
          
        }
        return(
          <div className="rows">
            <div className="add" id={lugares[keyName].nombre} onClick={handleAdd}>Agregar</div>
            <div className="col1" key={keyIndex}>{lugares[keyName].nombre}</div>
            <div className="col2" id={lugares[keyName].nombre} key={keyIndex} onClick={handlePlace}>{sensores[lugares[keyName].nombre]}</div>
            
          </div>
        
        )
       
      });

   
    }

    useEffect(() => {
    
         getSensors();
         getPlaces();
    }, [])
 

  return (
    <div>

      
       <p className="title">Mi Apartamento</p>
       <p className="subtitle">Sensores de Temperatura y Humedad disponibles en mi apartamento</p>
       <div className="container">
         <div className="rows">
         <div className="add" style={{opacity:"0"}}>Agregar</div>
           <div className="col1" style={{marginTop:"20px"}}><strong>Lugar</strong></div ><div style={{marginTop:"20px"}}><strong>sensores</strong></div>
         </div>

         {rows}
        
       
       </div>

       {
         lugarSelec ?  <div className="deleteContainer" id={lugarSelec} onClick={handleDelete}>
         {"Delete " + lugarSelec}</div>: ''
       
       }

      
       <div>
        
       </div>
       

    </div>
  );
};

export default Dashboard;
