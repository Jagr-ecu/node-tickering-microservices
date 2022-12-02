import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";

it("returns a 404 if the provided id does not exists", async () => {
   const id = new mongoose.Types.ObjectId().toHexString();

   await request(app)
      .get(`/api/tickets/${id}`)
      .set("Cookie", global.signin())
      .send({
         title: "asdfdf",
         price: 20,
      })
      .expect(404);
});

it("returns a 401 if the user is not autehticated", async () => {
   const id = new mongoose.Types.ObjectId().toHexString();

   await request(app)
      .get(`/api/tickets/${id}`)
      .send({
         title: "asdfdf",
         price: 20,
      })
      .expect(401);
});

it("returns a 401 if the user does not own the ticket", async () => {
   const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({
         title: "adsdad",
         price: 30,
      });

   await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", global.signin())
      .send({
         title: "adsdasdd",
         price: 302,
      })
      .expect(401);
});

it("returns a 400 if the user provides an invalid title or price", async () => {
   const cookie = global.signin();

   const response = await request(app).post("/api/tickets").set("Cookie", cookie).send({
      title: "adsdad",
      price: 30,
   });

   await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({
         price: 302,
      })
      .expect(401);
});

it("updates the ticket provided valid inputs", async () => {
   const cookie = global.signin();

   const response = await request(app).post("/api/tickets").set("Cookie", cookie).send({
      title: "adsdad",
      price: 30,
   });

   await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({
         title: "titulo",
         price: 302,
      })
      .expect(200);

    const ticketResponse = await request(app)
      .get(`/api/tickets/${response.body.id}`)
      .send();

    expect(ticketResponse.body.title).toEqual('titulo')
    expect(ticketResponse.body.price).toEqual(302)
});
