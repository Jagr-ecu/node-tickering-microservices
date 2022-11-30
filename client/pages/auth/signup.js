import React from "react";
import Router from "next/router";

import useRequest from "../../hooks/useRequest";

const signup = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const { doRequest, errors } = useRequest({
      //Because we are using the same host and port to serve all the components.
      url: "/api/users/signup",
      method: "post",
      body: {
         email,
         password,
      },
      onSuccess: () => Router.push("/")
   });

   const onSubmit = async (event) => {
      event.prevenDefault(0);
      
      await doRequest();
   };

   return (
      <form onSubmit={onSubmit}>
         <h1>Registro</h1>
         <div className="form-group">
            <label>Correo Electronico</label>
            <input
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="form-control"
            />
         </div>
         <div className="form-group">
            <label>Contraseña</label>
            <input
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               type="password"
               className="form-control"
            />
         </div>
         {errors}
         <button className="btn btn-primary">Registrarse</button>
      </form>
   );
};

export default signup;
