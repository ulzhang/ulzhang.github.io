import { connect } from "react-redux";
import { setPlacePreviewVisibility } from "../../store/actions";
import { IState } from "../../store/models";
import { AiFillCloseCircle } from "react-icons/ai";
import "./Preview.css";

const Preview = ({ isVisible, place, closePreview }: any) => {
  return (
    <div
      className={`preview__container preview__container--${
        isVisible && place && "active"
      }`}
    >
      <div className="preview__close" onClick={() => closePreview()}>
        <AiFillCloseCircle></AiFillCloseCircle>
      </div>
      {/* <div
        className="preview__picture"
        style={{ background: '#00B140' }}
      ></div> */}
      <div className="preview__description__container">
        <h1>Location</h1>
        <div className="preview__location">{place?.location}</div>

        <h1>Date</h1>
        <div className="preview__date">{place?.date}</div>

        <h1>Description</h1>
        <div className="preview__description">{place?.description}</div>

        <h1>Position</h1>
        <div className="preview__latlng">{place?.position}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  const { places } = state;
  return { isVisible: places.placePreviewsIsVisible, place: places.selectedPlace };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    closePreview: () =>
      dispatch(setPlacePreviewVisibility(false)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
