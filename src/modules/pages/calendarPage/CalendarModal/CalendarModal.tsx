// import styles from "./CalendarModal.module.css";

// import {  MenuItem } from "@mui/material";
// import type { Student } from "@/entities/student";
// import { MyButton } from "../../../../components/UI/MyButton";
// import { Modal, Select } from "antd";
// import { Controller, useForm } from "react-hook-form";

// interface CalendarModalProp {
//   isDialogOpen: boolean;
//   onClose: () => void;
//   onAdd: (e: React.FormEvent) => void;
//   currentStudent: string;
//   setCurrentStudent: (id: string) => void;
//   students: Student[];
//   isLoading: boolean;
// }

// export const CalendarModal = ({
//   isDialogOpen,
//   currentStudent,
//   students,
//   isLoading,
//   onClose,
//   onAdd,
//   setCurrentStudent,
// }: CalendarModalProp) => {
  
  
//     const { handleSubmit, control, reset } = useForm<Student>({
//       mode: "onSubmit",
//     });
  
//     const onSubmit = (data: Student) => {
//         onClose();
//       console.log(data);
//     };

//   return (
//     <>
//       <Modal
//         open={isDialogOpen}
//         onCancel={onClose}
//         className={styles.newEventmodalContainer}
//         footer={null}
//         // onCancel={handleCancel}
//       >
//         <form className={styles.dialogForm} onSubmit={handleSubmit(onSubmit)}>
// <Controller
//             name="firstName"
//             control={control}
//                 style={{ width: "100%" }}
//                   onChange={onChange}
//                   value={value}
//             render={({ field }) => (
//               <>
//                 <label className={styles.formLabel}>
//                   Студент
//                   <Select {...field} />
//                 </label>
               
//               </>
//             )}
         
//                   options={students.map((student) => ({
//                     value: student.id,
//                     label: `${student.firstName} ${student.lastName}`,
//                   }))}
//   {students?.map((student) => (
//                     <MenuItem key={student.id} value={student.firstName}>
//                       {student.firstName}
//                     </MenuItem>
//                   ))
//               }
        
        
//         <MyButton  htmlType="submit"  onClick={() => onAdd}> Добавить</MyButton>
//         <MyButton htmlType="button">Отмена</MyButton>
//          </form>
//       </Modal>

// </>



            
        

      


//   );
// };
