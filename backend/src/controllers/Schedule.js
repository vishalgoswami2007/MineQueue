import {Schedule} from "../modal/ScheduleSchema.js";

const createSchedule = async (req , res) => {
 try {
    
  const {day , slots} = req.body;

  const doctorId = req.user.userId;

 const newSchedule = await  Schedule.create({
       doctorId,
       day,
       slots
    })
  
        return res.status(201).json({message:"Schedule Created Successfully" , Schedule:newSchedule})

 } catch (error) {
   
         return res.status(500).json({message:"Schedule Created Failed" , error:error.message})
 }
}

export {createSchedule};



