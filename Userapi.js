import bcrypt from 'bcrypt';
import Table from '../model/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from '../model/token.js';


dotenv.config();

/***here we write the logic for signup page***/
export const signupUser = async (request, response) => {
  try {
      // const salt = await bcrypt.genSalt();
      // const hashedPassword = await bcrypt.hash(request.body.password, salt);

      console.log("Hello");
      const hashedPassword = await bcrypt.hash(request.body.Password, 10);

      const user = { Username: request.body.Username, Name: request.body.Name, Password: hashedPassword }

      const newUser = new Table(user);
      await newUser.save();

      return response.status(200).json({ msg: 'Signup successfull' });
  } catch (error) {
      return response.status(500).json({ msg: 'Error while signing up user' });
  }
}

export const loginUser = async(request, response)=>{
  let user = await Table.findOne({Username:request.body.Username});

  if(!user)
  {
    return response.status(400).json({ msg: 'Username does not match' });
  }
  try {
    let match = await bcrypt.compare(request.body.Password, user.Password);

    if(match)
    {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m'});
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
            
            const newToken = new Token({ token: refreshToken });
            await newToken.save();
        
            response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken,Name: user.Name, Username: user.Username });

    }else{
      response.status(400).json({ msg: 'Password does not match' });
    }
  } catch (error) {
    
  }
}