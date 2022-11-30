import axios from "axios";

const buildClient = ({ req }) => {
   //verfica si se ejecuta desde el servidor o navegador
   if (typeof window === "undefined") {
      //estamos en el servidor
      //las solicitudes se deben hacer a http://ingress-nginx.ingress-nginx....
      
      return axios.create({
        baseURL: "http://ingress-nginx-controller.ingress-nginx.cluster.local",
        headers: req.headers
      });

   } else {
      //estamos en el navegador o client
      //request can be made mwith a base url of ''
     
      //el navegador se hace cargo de los headers
      return axios.create({
        baseURL: "/"
      });
   }
};

export default buildClient;
