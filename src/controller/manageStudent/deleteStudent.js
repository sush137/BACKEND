import { Router } from "express";

const router = Router();
import studentModel from "../../models/studentModel.js";
import RESPONSE from "../../config/global.js";
import { setErrorRes, send } from "../../helper/responseHelper.js";
import { STATE } from "../../config/constants.js";
import validator from "validator";

router.delete ("/:id?",  async (req, res) => {
  try {
    
let student_id = req.query.student_id;
if (!student_id|| student_id == undefined) {
  return send( res, setErrorRes (RESPONSE.REQUIRED, "student_id"));
}
let studentData = await studentModel.aggregate([
  {
    $match : { $expr : { $eq: ["$_id", { $toObjectId : student_id}] }, 
    isactive : STATE.ACTIVE,
  },
  },
  ]);

if (studentData.length ===0) {
  return send(res, setErrorRes(RESPONSE.NOT_FOUND, "Student data"));
 }
//  console.log(studentData);
 await studentModel.findByIdAndUpdate (
  {
    _id: student_id,
    isactive: STATE.ACTIVE,
  },
  {
    isactive: STATE.INACTIVE,
  }
 );
// await studentModel.updateOne({
//   _id: student_id
// }
// )

 return send(res, RESPONSE.SUCESS); 
 } catch (error) {
    console.log(error.message);
    return send (res, RESPONSE.UNKNOWN_ERR);
  }
});

export default router;
