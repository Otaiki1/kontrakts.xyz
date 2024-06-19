import { FaSpinner } from "react-icons/fa6";
import PropTypes from "prop-types";

function Spinner({ message }) {
  return (
    <div className="fixed inset-0  flex h-screen w-full bg-slate-900 bg-opacity-50">
      <div className="m-auto flex h-auto w-6/12 flex-col items-center gap-y-8 rounded-lg bg-white p-5 ">
        <FaSpinner className="animate-spin" size={30} color="blue" />
        <h4 className="text-[12px] font-bold text-slate-600">{message}</h4>
      </div>
    </div>
  );
}

Spinner.propTypes = {
  message: PropTypes.node.isRequired,
};

export default Spinner;
