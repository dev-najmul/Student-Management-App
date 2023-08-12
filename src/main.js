//add student form
const add_student_form = document.getElementById("add_student_form");
//Edit student data form
const edit_studentData_form = document.getElementById("edit_studentData_form");
//Add result form
const add_result_form = document.getElementById("add_result_form");
//edit mark form
const editResult_form = document.getElementById("editResult_form");
//show table data
const t_post_list = document.querySelector(".t_post_list");
const msgM = add_student_form.previousElementSibling;

/**
 * Show student List in fontend
 */
const showStudents = () => {
  let stuData = getLsData("students");
  let contentShow = ``;

  stuData.forEach((item, index) => {
    let allposts = `
    <tr class="align-middle">
    <td>${index + 1}</td>
    <td>
      <img
        style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%"
        src="${item.stu_photo}"
        alt=""
      />
    </td>
    <td>${item.stu_name}</td>
    <td>${item.stu_roll}</td>
    <td>${item.stu_reg}</td>
    <td>${timeAgo(item.stu_add_time)}</td>
    <td>
      <div class="add_or_view_res">
      ${
        item.stu_result === null
          ? `<button class="btn btn-sm btn-success" data-bs-toggle ="modal" data-bs-target="#add_stu_result_modal" onclick="GaddResId(${item.stu_id})"> Add result </button>`
          : `<button class="btn btn-sm btn-warning" data-bs-toggle ="modal" data-bs-target="#view_marks_modal" onclick="ViewMarksId(${item.stu_id})"> View result </button>`
      }
      
      
      </div>
      
    </td>
    <!-- acction buttons -->
    <td>
      <button class="btn btn-sm btn-info" data-bs-toggle="modal"
      data-bs-target="#view_stu_modal" onclick="viewSingleStu('${
        item.stu_roll
      }')">
        <i class="fa-solid fa-eye"></i>
      </button>
      <button class="btn btn-sm btn-warning" data-bs-toggle="modal"
      data-bs-target="#edit_stu_data_modal" onclick="editSingleStuData('${
        item.stu_roll
      }')">
        <i class="fa-solid fa-pen-to-square"></i>
      </button>
      <button onclick="delateStudent('${
        item.stu_reg
      }')" class="btn btn-sm btn-danger">
        <i class="fa-solid fa-trash"></i>
      </button>
    </td>
  </tr>
     `;

    contentShow += allposts;
  });

  t_post_list.innerHTML = contentShow;
};

showStudents();
// add students
add_student_form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  let fildData = Object.fromEntries(data.entries());

  //form validation
  if (!fildData.name || !fildData.roll || !fildData.reg) {
    msgM.innerHTML = createAlert("Fields are requerd");
  } else if (!isNumber(fildData.roll) || !isNumber(fildData.reg)) {
    msgM.innerHTML = createAlert("Not valid Roll or Reg", "warning");
  } else {
    let studentDataList = getLsData("students");
    studentDataList.push({
      stu_name: fildData.name,
      stu_roll: fildData.roll,
      stu_reg: fildData.reg,
      stu_photo: fildData.photo,
      stu_add_time: Date.now(),
      stu_result: null,
      stu_id: Math.floor(Math.random() * 11000),
    });

    setLsData("students", studentDataList);
    msgM.innerHTML = createAlert(
      `<b>${fildData.name}</b> created successfully`,
      "info"
    );
    showStudents();
    e.target.reset();
  }
});

// delate student data

function delateStudent(reg) {
  // validation
  let conf = confirm("Are you sure you want to delate?");

  if (conf) {
    let oldStuData = getLsData("students");
    let updateStuData = oldStuData.filter((data) => data.stu_reg !== reg);
    oldStuData = updateStuData;

    setLsData("students", oldStuData);

    showStudents();
  } else {
    alert("Your data is Safe");
  }
}

// view Student single data
const viesStu_wrapper = document.getElementById("viesStu_wrapper");
function viewSingleStu(item) {
  let stuDataList = getLsData("students");
  let checkedList = stuDataList.find((data) => data.stu_roll == item);
  let content = ``;
  console.log(checkedList);

  let contentDynamic = `
    <div class="view-stu-card text-center" style="border-radius: 10px">
    <div class="row px-3 align-middle">
      <div class="col-md-4">
        <img
          style="
            width: 130px;
            object-fit: cover;
            height: 130px;
            border-radius: 5px;
          "
          src="${checkedList.stu_photo}"
          alt=""
        />

        <h6 class="mt-1">ID: ${checkedList.stu_id}</h6>
      </div>
      <div class="col-md-8 rounded" style="border: 1px solid #ddd">
        <div class="name_view_m p-3">
          <h4><strong>${checkedList.stu_name}</strong></h4>
        </div>
        <table class="table table-striped table-hover shadow">
          <thead>
            <tr class="align-middle">
              <th><h5>Roll</h5></th>
              <th><h5>Reg No</h5></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${checkedList.stu_roll}</td>
              <td>${checkedList.stu_reg}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <h6 class="text-center mt-4">
    Added by Farhan <br /><small>${timeAgo(checkedList.stu_add_time)}.</small>
  </h6>
    `;

  content = contentDynamic;

  viesStu_wrapper.innerHTML = content;
}

// edit student data

function editSingleStuData(itemRoll) {
  // get all input
  const name_of_stu = document.querySelector(".ed_name_fild");
  const roll_of_stu = document.querySelector(".ed_roll_fild");
  const reg_of_stu = document.querySelector(".ed_reg_fild");
  const photo_of_stu = document.querySelector(".ed_photo_fild");
  const id_of_stu = document.querySelector(".ed_id_fild");
  const ed_show_img = document.querySelector("#ed_show_img");

  //find previous value
  let stuDataList = getLsData("students");
  let checkedList = stuDataList.find((data) => data.stu_roll == itemRoll);

  //set pre valut to input
  name_of_stu.setAttribute("value", checkedList.stu_name);
  roll_of_stu.setAttribute("value", checkedList.stu_roll);
  reg_of_stu.setAttribute("value", checkedList.stu_reg);
  photo_of_stu.setAttribute("value", checkedList.stu_photo);
  id_of_stu.setAttribute("value", checkedList.stu_id);
  ed_show_img.setAttribute("src", checkedList.stu_photo);
}
// edit updated student data
edit_studentData_form.addEventListener("submit", (e) => {
  e.preventDefault();

  const fdata = new FormData(e.target);
  let data = Object.fromEntries(fdata.entries());
  let oldAllData = getLsData("students");

  oldAllData[oldAllData.findIndex((item) => item.stu_id == data.id)] = {
    ...oldAllData[oldAllData.findIndex((item) => item.stu_id == data.id)],
    stu_name: data.name,
    stu_roll: data.roll,
    stu_reg: data.reg,
    stu_photo: data.photo,
  };
  setLsData("students", oldAllData);
  showStudents();
});

// add result
function GaddResId(id) {
  let oldData = getLsData("students");
  let clickResData = oldData.find((item) => item.stu_id === id);

  // add result submit
  add_result_form.onsubmit = (e) => {
    e.preventDefault();
    let msg_res = document.querySelector(".msg_res");
    const fdata = new FormData(e.target);
    let subData = Object.fromEntries(fdata.entries());

    //form validation
    if (
      !subData.bangla ||
      !subData.english ||
      !subData.science ||
      !subData.math ||
      !subData.relagion
    ) {
      msg_res.innerHTML = createAlert("Fild can't be empty");
    } else {
      oldData[oldData.findIndex((item) => item.stu_id === id)] = {
        ...oldData[oldData.findIndex((item) => item.stu_id === id)],
        stu_result: subData,
      };
      setLsData("students", oldData);
      showStudents();

      e.target.reset();

      msg_res.innerHTML = createAlert("Result added sucessfully", "success");
      e.target.reset();
    }
  };
}

// View marks
function ViewMarksId(id) {
  let oldData = getLsData("students");
  let clickResData = oldData.find((item) => item.stu_id === id);

  let bangla = editResult_form.querySelector('input[name="bangla"]');
  let english = editResult_form.querySelector('input[name="english"]');
  let math = editResult_form.querySelector('input[name="math"]');
  let science = editResult_form.querySelector('input[name="science"]');
  let relagion = editResult_form.querySelector('input[name="relagion"]');

  // set pre valu on input

  bangla.setAttribute("value", clickResData.stu_result.bangla);
  english.setAttribute("value", clickResData.stu_result.english);
  math.setAttribute("value", clickResData.stu_result.math);
  science.setAttribute("value", clickResData.stu_result.science);
  relagion.setAttribute("value", clickResData.stu_result.relagion);

  // edit mark form submit

  editResult_form.onsubmit = (e) => {
    e.preventDefault();
    let oldData = getLsData("students");
    const fdata = new FormData(e.target);
    let subData = Object.fromEntries(fdata.entries());

    oldData[oldData.findIndex((item) => item.stu_id === id)] = {
      ...oldData[oldData.findIndex((item) => item.stu_id === id)],
      stu_result: {
        bangla: subData.bangla,
        english: subData.english,
        science: subData.science,
        math: subData.math,
        relagion: subData.relagion,
      },
    };
    setLsData("students", oldData);
    showStudents();
  };
}
