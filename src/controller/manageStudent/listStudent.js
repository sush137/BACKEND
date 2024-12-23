import { Router } from "express";

const router = Router();
import studentModel from "../../models/studentModel.js";
import RESPONSE from "../../config/global.js";
import { setErrorRes, send } from "../../helper/responseHelper.js";
import { STATE } from "../../config/constants.js";
import validator from "validator";


router.get ("/",  async (req, res) => {
  try {
    let student_id = req.query.student_id;
    let rollno = req.query.rollno;
    let query = {};
    query.isactive = STATE.ACTIVE;
    rollno != undefined ? (query.rollno = rollno) : "";

    student_id !=undefined
    ? (query.$expr ={ $eq: ["$_id", { $objectId: student_id }]})
    : "" ;

    let studentData = await studentModel.aggregate([
    {
        $match:  query ,   
          // _id : "6763b72765e7f5e02d1ff99c",
          //   isactive: STATE.ACTIVE,
          // {
          //   $match: {$expr: { "$_id", {$toObjectId : student_id }] } },
          // },
      },
    {
            $project: {
                isactive :0,
                __v: 0,
            },
    },
    
    
]);
 if (studentData.length ===0) {
  return send(res, setErrorRes(RESPONSE.NOT_FOUND, "Student data"));
 }
 return send(res, RESPONSE.SUCESS,studentData); 
 } catch (error) {
    console.log(error.message);
    return send (res, RESPONSE.UNKNOWN_ERR);
  }
});

export default router;
