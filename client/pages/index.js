import React from "react";
import buildClient from "../api/buildClient";

const LandingPage = ({ currentUser }) => {
   return currentUser ? <h1>Has iniciado sesion</h1> : <h1>No has iniciado sesion</h1>
};

//se ejecuta durante el proceso de renderizado
//to fetch some data specifically for doing some initial rendering of our app
LandingPage.getInitialProps = async (context) => {
   const client = buildClient(context);
   const { data } = await client.get("/api/users/currentuser");

   return data;
};

export default LandingPage;
