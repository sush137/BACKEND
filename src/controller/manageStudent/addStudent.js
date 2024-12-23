import { Router } from "express";

const router = Router();
import studentModel from "../../models/studentModel.js";
import RESPONSE from "../../config/global.js";
import { setErrorRes, send } from "../../helper/responseHelper.js";
import { STATE } from "../../config/constants.js";
import validator from "validator";

router.post("/",  async (req, res) => {
  try {
    const { name, rollno, email } = req.body;

    // console.log({ name, rollno, email });

    if (!name || name == undefined) {
      // const response = RESPONSE.REQUIRED;
      // res.json({
      //   code: response.code,
      //   message: "name" + response.message,
      //   responseMessage : "name is mandatory",
      // });
    
    
      return send( res, setErrorRes (RESPONSE.REQUIRED, "name"));

    }
    if (!rollno || rollno == undefined) {
      // const response = RESPONSE.REQUIRED;
      // res.json({
      //   code: response.code,
      //   message: "rollno" + response.message,
      // });

      // return send( res, setErrorRes (RESPONSE.REQUIRED, "rollno"));
    // }
    if (!email || email == undefined) {
      // const response = RESPONSE.REQUIRED;
      // res.json({
      //   code: response.code,
      //   message: "email" + response.message,
      // });
      // return send( res, setErrorRes (RESPONSE.REQUIRED, "email"));
    }
  //   let isEXist = await studentModel.find({
  //     rollno: rollno,
  //   });


  //   if(isEXist.length >0){
  //     return send( res, setErrorRes (RESPONSE.ALREADY_EXISTS, "rollno"));
  //   }
  //  console.log(isEXist.length);

  let isEmail = validator.isEmail(email);

  if(!isEmail)
    return send( res, setErrorRes (RESPONSE.INVALID, "email"));
  }
   let isEXist = await studentModel.aggregate([
    {
      $match : {
        rollno : rollno,
        isactive :STATE.ACTIVE,
      }
    }
   ]);

   if(isEXist.length >0){
    return send( res, setErrorRes (RESPONSE.ALREADY_EXISTS, "rollno"));
   }
    studentModel.create({
      name: name,
      rollno: rollno,
      email: email,
    });


    // let isEmail = validator.isEmail(email)

    return send(res, RESPONSE.SUCESS); 

    // res.json(RESPONSE.SUCCESS);
  } catch (error) {
    console.log(error.message);
    return send (res, RESPONSE.UNKNOWN_ERR);
  }
});

export default router;
