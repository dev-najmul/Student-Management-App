//search form
const serach_form = document.getElementById("serach_form");
//search form  message div
const sFmsg = document.querySelector(".sFmsg");
//result_card_wrapper
const result_card_wrapper = document.getElementById("result_card_wrapper");

serach_form.addEventListener("submit", (e) => {
  e.preventDefault();
  const fdata = new FormData(e.target);
  let data = Object.fromEntries(fdata.entries());

  //old data
  let stuData = getLsData("students");
  let stuRes = stuData.find(
    (item) => item.stu_roll === data.roll && item.stu_reg === data.reg
  );

  //validation
  if (!data.roll || !data.reg) {
    sFmsg.innerHTML = createAlert("Fild can't be empty");
  } else if (!stuData.find((item) => item.stu_roll === data.roll)) {
    sFmsg.innerHTML = " ";
    sFmsg.innerHTML = createAlert("Roll is not valied");
  } else if (!stuData.find((item) => item.stu_reg === data.reg)) {
    sFmsg.innerHTML = " ";
    result_card_wrapper.innerHTML = ` <div class="loder">
      <div class="card">
        <div class="card-body text-center">
          <img
            style="height: 500px; object-fit: contain"
            class="w-50 p-0 text-center"
            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
          />
        </div>
      </div>
    </div>`;
    setTimeout(() => {
      let content;
      content = createAlert("Reg is not valied");
      result_card_wrapper.innerHTML = content;
      clearTimeout(delay);
      e.target.reset();
    }, 1000);
  } else if (stuRes) {
    sFmsg.innerHTML = " ";
    //preloder
    result_card_wrapper.innerHTML = ` <div class="loder">
      <div class="card">
        <div class="card-body text-center">
          <img
            style="height: 500px; object-fit: contain"
            class="w-50 p-0 text-center"
            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
          />
        </div>
      </div>
    </div>`;

    //show result with markshit
    let delay = setTimeout(() => {
      let content;

      content = `
    <div class="card" >
    <div class="card-body">
    <div class="title text-center pt-4 pb-2">
      <h2 class="py-2">
        Result of SSC or Equivalent Examination - 2023
      </h2>
      <div class="print-btn pt-3" style="text-align: center">
        <button
          style="background-color: rgb(0, 0, 0)"
          class="border rounded py-1 px-3 text-light"
          onClick="printdiv('printD');"
        >
          Prient result
        </button>
      </div>
    </div>
    <hr />
    <div class="all_shit_wrapper" id="printD">
      <div class="stu_info_box">
        <!-- <div class="print_btn text-center py-3">
            <button class="btn btn-info btn-lg">Search Again</button>
            <button class="btn btn-success btn-lg">Print (result)</button>
          </div> -->
      </div>
      <div class="stu_info_tbl py-4">
        <div
          class="view-stu-card text-center p-3 border"
          style="border-radius: 10px"
        >
          <div class="row justify-content-left px-3">
            <div class="col-md-3">
              <img
                style="
                  width: 130px;
                  object-fit: cover;
                  height: 130px;
                  border-radius: 5px;
                "
                src="${stuRes.stu_photo}"
                alt=""
              />
  
              <h6 class="mt-1"><b>ID:</b> ${stuRes.stu_id}</h6>
            </div>
            <div
              class="col-md-9 rounded"
              style="border: 1px solid #ddd"
            >
              <div class="name_view_m p-3">
                <h4><strong>${stuRes.stu_name}</strong></h4>
              </div>
              <table class="table table-striped table-hover shadow">
                <thead>
                  <tr class="align-middle">
                    <th><h5>Roll</h5></th>
                    <th><h5>Reg No</h5></th>
                    <th><h5>Status</h5></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>${stuRes.stu_roll}</td>
                    <td>${stuRes.stu_reg}</td>
                    <td>
                      <strong class="text-black">${
                        getFinalResult(
                          `${stuRes.stu_result.bangla}`,
                          `${stuRes.stu_result.english}`,
                          `${stuRes.stu_result.math}`,
                          `${stuRes.stu_result.science}`,
                          `${stuRes.stu_result.relagion}`
                        ).opTest
                      }</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="markshit_box py-3 mt-3">
        <table class="table table-bordered align-middle table-hover">
          <!-- table head -->
          <tr class="align-middle">
            <td><b>Subject</b></td>
            <td><b>Marks</b></td>
            <td><b>GPA</b></td>
            <td><b>Grade</b></td>
            <td><b>CGPA</b></td>
            <td><b>Final Result</b></td>
          </tr>
          <!-- table content -->
          <tr class="align-middle">
            <td>Bangla</td>
            <td>${stuRes.stu_result.bangla}</td>
            <td>${gpaCal(`${stuRes.stu_result.bangla}`).gpa}</td>
            <td>${gpaCal(`${stuRes.stu_result.bangla}`).grade}</td>
            <td rowspan="6" class="text-center">
              <strong>${getFinalResult(
                `${stuRes.stu_result.bangla}`,
                `${stuRes.stu_result.english}`,
                `${stuRes.stu_result.math}`,
                `${stuRes.stu_result.science}`,
                `${stuRes.stu_result.relagion}`
              ).cgpa.toFixed(2)}</strong>
            </td>
            <td rowspan="6" class="text-center">
              <strong>${
                getFinalResult(
                  `${stuRes.stu_result.bangla}`,
                  `${stuRes.stu_result.english}`,
                  `${stuRes.stu_result.math}`,
                  `${stuRes.stu_result.science}`,
                  `${stuRes.stu_result.relagion}`
                ).result
              }</strong>
            </td>
          </tr>
  
          <tr class="align-middle">
            <td>Math</td>
            <td>${stuRes.stu_result.math}</td>
            <td>${gpaCal(`${stuRes.stu_result.math}`).gpa}</td>
            <td>${gpaCal(`${stuRes.stu_result.math}`).grade}</td>
          </tr>
  
          <tr class="align-middle">
            <td>Science</td>
            <td>${stuRes.stu_result.science}</td>
            <td>${gpaCal(`${stuRes.stu_result.science}`).gpa}</td>
            <td>${gpaCal(`${stuRes.stu_result.science}`).grade}</td>
          </tr>
  
          <tr class="align-middle">
            <td>Relagion</td>
            <td>${stuRes.stu_result.relagion}</td>
            <td>${gpaCal(`${stuRes.stu_result.relagion}`).gpa}</td>
            <td>${gpaCal(`${stuRes.stu_result.relagion}`).grade}</td>
          </tr>
  
          <tr class="align-middle">
            <td>English</td>
            <td>${stuRes.stu_result.english}</td>
            <td>${gpaCal(`${stuRes.stu_result.english}`).gpa}</td>
            <td>${gpaCal(`${stuRes.stu_result.english}`).grade}</td>
          </tr>
        </table>
      </div>
      <div class="copy_right pt-3">
        <p style="text-align: center; margin-right: 10px">
          Develop & Maintained By
          <a href="https://farhanrajnajmul.com"><b>Farhan</b></a>
        </p>
      </div>
    </div>
  </div>
  </div>
    `;
      result_card_wrapper.innerHTML = content;
      clearTimeout(delay);
      e.target.reset();
    }, 1000);

    window.location.href = "#resDiv";
  } else {
    sFmsg.innerHTML = " ";
    result_card_wrapper.innerHTML = ` <div class="loder">
      <div class="card">
        <div class="card-body text-center">
          <img
            style="height: 500px; object-fit: contain"
            class="w-50 p-0 text-center"
            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
          />
        </div>
      </div>
    </div>`;
    setTimeout(() => {
      let content;
      content = createAlert("Result not found", "warning");
      result_card_wrapper.innerHTML = content;
      clearTimeout(delay);
      e.target.reset();
    }, 1000);
  }
});
