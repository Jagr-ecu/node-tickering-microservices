import mongoose from "mongoose";
import { Password } from '../services/password';

// interfaz que describe las propiedades que son requeridas para 
// crear un usuario
interface UserAttrs {
    email: string;
    password: string
}

//una interfaz que describe las propiedades que el model de User tiene
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

//interfaz que describe las propiedades que el documento de User tiene
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
} 

//con toJSON se formatea el objecto
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id
            delete ret.password;
            delete ret.__v;
        }
    }
});

//funcion middleware que implementa mongoose
//cualquier intento de guardar un documento a la bd, se ejecuta la funcion
//no se usa funcion flecha porque cada vez que se hace una funcion de middleware, 
//tendremos acceso al documento que esta siendo guardado entonces con la funcion normal
//accedemos al documento user que se quiere guardar con 'this'
userSchema.pre('save', async function (done) {
    //solo se aplica hash si el password ha sido modificado
    if(this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
})

//custom function built into a model en la propiedad statics
//en vez de crear un usuario con new User({pros: ...}) se usa esta funcion
userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);


export { User }; 