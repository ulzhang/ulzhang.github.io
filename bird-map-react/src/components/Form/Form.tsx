import { connect } from "react-redux";
import { addNewPlace as addNewPlaceAction, setPlaceFormVisibility } from "../../store/actions";
import { IState, Place } from "../../store/models";
import { AiFillCloseCircle } from "react-icons/ai";
import "./Form.css";
import { Field, Formik, Form as FormikForm } from "formik";
import { LatLng } from "leaflet";

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDafTBcwBZ9g7nnzvQYW1m644ZV_sRTvJQ",
  authDomain: "bird-maps-1.firebaseapp.com",
  databaseURL: "https://bird-maps-1-default-rtdb.firebaseio.com",
  projectId: "bird-maps-1",
  storageBucket: "bird-maps-1.appspot.com",
  messagingSenderId: "460361909334",
  appId: "1:460361909334:web:9e8db450c35df6e9bda7f7",
  measurementId: "G-K6PPGQL6T2"
};

const app = initializeApp(firebaseConfig);
function writeMapData(LatLng: LatLng, location: string, description: string, date: number) {
  const db = getDatabase();
  location = location ? location : 'test';
  set(ref(db, 'sighting/' + date.toString() + '/'), {
    date: new Date(date).toString(),
    LatLng: LatLng,
    location: location,
    description: description
  });
  console.log("when: " + date.toString() + " where: " + LatLng)
}

const Form = ({
  isVisible,
  position,
  closeForm,
  addNewPlace
}: {
  isVisible: boolean;
  position: LatLng;
  closeForm: Function;
  addNewPlace: Function;
}) => {

  const initialValues = {
    location: "",
    description: "",
  };

  const validator = (values: PlaceFormProps) => {
    const keys = Object.keys(values);

    return keys.reduce((prev, curr) => {
      if (!values[curr]) {
        return { ...prev, [curr]: "required" };
      }
      return prev;
    }, {});
  };

  const handleOnSubmit = (values: PlaceFormProps) => {
    const date = Date.now()
    addNewPlace({
      ...values,
      position: [position.lat, position.lng],
      date: new Date(date).toString()
    });
    writeMapData(position, values.location, values.description, date);
    closeForm()
  }

  return (
    <div
      className={`form__container form__container--${isVisible && "active"}`}
    >
      <div className="form__header">
        <span
          className="form__header__close"
          role="button"
          onClick={() => closeForm()}
        >
          <AiFillCloseCircle />
        </span>
        <span className="form__header__title">Add new Place</span>
      </div>
      <Formik
        initialValues={initialValues}
        validate={validator}
        onSubmit={handleOnSubmit}
      >
        {({ errors, touched, isValidating }) => (
          <FormikForm>

            <div className="formGroup">
              <div className="formGroupInput">
                <label htmlFor="location">Location</label>
                <Field id="location" name="location" placeholder="Neighborhood?" />
              </div>
              {errors.location && <div className="errors">Required</div>}
            </div>
            <div className="formGroup">
              <div className="formGroupInput">
                <label htmlFor="description">Description</label>
                <Field
                  id="description"
                  name="description"
                  placeholder="General observation notes..."
                />
              </div>
              {errors.description && <div className="errors">Required</div>}
            </div>

            <div className="button__container">
              <button className="form__button" type="submit">Submit</button>
            </div>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  const { places } = state;
  return {
    isVisible: places.placeFormIsVisible,
    position: places.prePlacePosition as LatLng,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    closeForm: () =>
      dispatch(setPlaceFormVisibility(false)),
    addNewPlace: (place: Place) => {
      dispatch(addNewPlaceAction(place))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);

interface PlaceFormProps {
  [key: string]: string;
  location: string;
  description: string;
}
