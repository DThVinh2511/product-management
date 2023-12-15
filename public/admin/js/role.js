// permissions
const tablePermission = document.querySelector("table[table-permissions]");
if(tablePermission) {
  const buttonSubmit = document.querySelector("[button-submit]");
  buttonSubmit.addEventListener("click", () => {
    let permissions = [];
    const rows = tablePermission.querySelectorAll("[data-name]");
    rows.forEach(row => {
      const name = row.getAttribute("data-name");
      const inputs = row.querySelectorAll("input");
      if(name == "id") {
        inputs.forEach(input => {
          permissions.push({
            id: input.value,
            permissions: []
          });
        })
      }
      else {
        inputs.forEach((input, index) => {
          const check = input.checked;
          if(check) {
            permissions[index].permissions.push(name);
          }
        });
      }
    });
    if(permissions.length > 0) {
      const formChangePermissions = document.querySelector("#form-change-permissions");
      const inputFormChangePermissions = formChangePermissions.querySelector("input[name='permissions']")
      inputFormChangePermissions.value = JSON.stringify(permissions);
      formChangePermissions.submit();
    }
  });
}
// end permissions

//show permissions
const dataRecord = document.querySelector("[data-record]");
if(dataRecord) {
  const records = JSON.parse(dataRecord.getAttribute("data-record"));
  const tablePermissions1 = document.querySelector("[table-permissions]");
  records.forEach((record, index) => {
    const permissions = record.permissions;
    permissions.forEach((item) => {
      const row1 = tablePermissions1.querySelector(`[data-name="${item}"]`);
      const input = row1.querySelectorAll("input")[index];
      input.checked = true;
    });
  })
}
//end show permissions