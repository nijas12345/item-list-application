import Swal, { SweetAlertResult } from "sweetalert2";

export const confirmDelete = (id: number, deleteCallback: (id: number) => void) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result: SweetAlertResult<void>) => {
    if (result.isConfirmed) {
      deleteCallback(id); 
      Swal.fire("Deleted!", "The item has been removed.", "success");
    }
  });
};
