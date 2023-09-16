// Third-party
import PropTypes from "prop-types";

// Utils
import { VIEW_STATUSES } from "../utils/constants";

// Styling
import "./css/filterstatus.css";

function FilterStatus({ statusHandler, disabled }) {
  return (
    <div className="dropdown-status">
      <select
        name="filtered-todos"
        className="filtered-todos"
        onChange={(e) => statusHandler(e.target.value)}
        disabled={disabled}
      >
        <option value={VIEW_STATUSES.all}>{VIEW_STATUSES.all}</option>
        <option value={VIEW_STATUSES.complete}>{VIEW_STATUSES.complete}</option>
        <option value={VIEW_STATUSES.incomplete}>
          {VIEW_STATUSES.incomplete}
        </option>
      </select>
    </div>
  );
}

// Default props
FilterStatus.defaultProps = {
  disabled: false,
};

// PropTypes
FilterStatus.propTypes = {
  statusHandler: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default FilterStatus;
