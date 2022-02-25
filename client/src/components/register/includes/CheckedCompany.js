import React, { useEffect, useState } from "react";
function companyTitle() {
  return (
    <div className="mb-3">
      <label for="companyTitle" class="form-label">
        Şirket Unvanı
      </label>
      <input type="text" class="form-control" />
    </div>
  );
}
const CheckedCompany = ({
  companyType,
  clickHandlerCompanyType,
  setCompanyType,
  ...props
}) => {
  return (
    <>
      {" "}
      <div className="mb-3">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" />
          <label class="form-check-label" for="flexCheckDefault">
            Elektrik
          </label>
        </div>
        <div className="form-check">
          {" "}
          <input class="form-check-input" type="checkbox" />
          <label class="form-check-label" for="flexCheckDefault">
            Motor
          </label>
        </div>
      </div>
      <div class="mb-3">
        {" "}
        <div className="mb-1">
          {" "}
          <label for="companyType" class="form-label">
            Şirket tipi
          </label>
          <br />
          <input
            checked={!companyType}
            onClick={clickHandlerCompanyType}
            type="radio"
            class="form-check-input mx-2"
            name="companyType"
          />{" "}
          <label for="companyType" class="form-label">
            Anonim
          </label>
          <input
            checked={companyType}
            onClick={clickHandlerCompanyType}
            type="radio"
            class="form-check-input  mx-2"
            name="companyType"
          />{" "}
          <label for="companyType" class="form-label" className="ml-1">
            Limited
          </label>
        </div>
        {companyType ? companyTitle() : null}
        <br />
        <label for="city" class="form-label">
          İl
        </label>
        <input type="text" class="form-control" />
      </div>
      <div className="mb-3">
        <label for="town" class="form-label">
          İlçe
        </label>
        <input type="text" class="form-control" />
      </div>
      <div className="mb-3">
        <label for="adress" class="form-label">
          Adres
        </label>
        <input type="text" class="form-control" />
      </div>{" "}
      <div className="mb-3">
        <label for="town" class="form-label">
          Tc No
        </label>
        <input type="text" class="form-control" />
      </div>
      <div className="mb-3">
        <label for="town" class="form-label">
          Ev Telefonu
        </label>
        <input type="text" class="form-control" />
      </div>
    </>
  );
};

export default CheckedCompany;
