import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../action-creater/userActionCreater";
import Loader from "../layout/Loader/Loader";

export function ShippingDialog() {
  let dispatch = useDispatch();
  let [city, setCity] = useState(undefined);
  let [state, setState] = useState(undefined);
  let [pinCode, setPinCode] = useState(undefined);
  let [phone, setPhone] = useState(undefined);
  let [name, setName] = useState(undefined);
  let [houseNumber, setFlat] = useState(undefined);
  let [area, setArea] = useState(undefined);
  let modelRef = useRef();

  let { loading } = useSelector(function (state) {
    return state.login;
  });


  function saveAddress() {
    let address = {
      name: name,
      city: city,
      houseNumber: houseNumber,
      state: state,
      mobile: phone,
      area: area,
      pinCode: pinCode,
    };
    dispatch(addAddress(address));
  }
  
  if (loading) {
    return <Loader />;
  } else
    return (
      <>
        <div className="add-adddress-btn">
          <img
            style={{ width: 16, height: 16 }}
            alt="icon"
            src="https://m.media-amazon.com/images/G/31/checkout/assets/addAddress._CB454652023_.png"
          />
          <button
            type="button"
            class="btn"
            data-toggle="modal"
            data-target="#exampleModalLong"
          >
            Add Address
          </button>
        </div>

        <div
          class="modal fade"
          id="exampleModalLong"
          tabindex="-1"
          role="dialog"
          ref={modelRef}
          aria-labelledby="exampleModalLongTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Enter a new delivery address
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <label for="fullname">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      class="form-control"
                      id="fullname"
                    />
                  </div>
                  <div class="form-group">
                    <label for="pincode">Pin Code</label>
                    <input
                      type="text"
                      class="form-control"
                      id="pincode"
                      value={pinCode}
                      onChange={(event) => setPinCode(event.target.value)}
                    />
                  </div>
                  <div class="form-group">
                    <label for="mobile">Mobile Number</label>
                    <input
                      type="text"
                      class="form-control"
                      id="mobile"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                    />
                  </div>
                  <div class="form-group">
                    <label for="houseNumber">
                      Flat, House no., Building, Company, Apartment
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      value={houseNumber}
                      onChange={(event) => setFlat(event.target.value)}
                      id="houseNumber"
                    />
                  </div>
                  <div class="form-group">
                    <label for="area">Area, Street, Sector, Village</label>
                    <input
                      type="text"
                      value={area}
                      onChange={(event) => setArea(event.target.value)}
                      class="form-control"
                      id="area"
                    />
                  </div>
                  <div class="form-group">
                    <label for="city">Town/city</label>
                    <input
                      type="text"
                      class="form-control"
                      value={city}
                      onChange={(event) => setCity(event.target.value)}
                      id="city"
                    />
                  </div>
                  <div class="form-group">
                    <label for="state">State</label>
                    <input
                      type="text"
                      class="form-control"
                      value={state}
                      onChange={(event) => setState(event.target.value)}
                      id="state"
                    />
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  onClick={saveAddress}
                  data-dismiss="modal"
                  class="btn btn-primary"
                >
                  Add Address
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
