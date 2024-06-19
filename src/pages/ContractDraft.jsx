import { useEffect, useState } from "react";
import { ContractModal, Spinner } from "../ui";

function ContractDraft() {
  const [isPending, setIspending] = useState(false);
  const [preview, setPreview] = useState(false);
  const [data, setData] = useState();

  const [formData, setFormData] = useState({
    recievingParty: "",
    otherParty: "",
    startDate: "",
    endDate: "",
    contractType: "",
  });

  const [dynamicFields, setDynamicFields] = useState({});

  const formFields = {
    "non disclosure agreement": {
      "Confidential Details": "",
      "Scope (narrow down to what it entails)": "",
      "Operational Requirements(modus operandi)": "",
    },
    "lease agreement": {
      "Lease Specifics": "",
      "Rent Details": "",
      "Rights/Obligations": "",
      "Dispute Resolution": "",
      "Deposit & Fees": "",
    },
    "employment contract": {
      "Job Info(title, job description)": "",
      "Compensation Details": "",
      "Working Conditions": "",
      "Benefits/Perks": "",
      "Termination Procedures": "",
      "Intellectual Property Rights": "",
    },
    "business contract": {
      "Description": "",
      "Terms and Conditions": "",
      "Offer Consideration": "",
      "Dispute Resolution": "",
      "termination clause": "",
    },
    "freelance contract": {
      "Scope of Work(deliverables, project)": "",
      "Timelines and deadlines": "",
      "Quality expectation": "",
      "Roles": "",
    },
    "one time sale": {
      "Description": "",
      "Payment Terms": "",
      "Contingencies": "",
      "Warranties": "",
    },
    others: {
      "Description(make very detailed)": "",
      "Settlement Terms": "",
      "Termination Clause:": "",
    },
  };

  useEffect(() => {
    if (formData.contractType) {
      setDynamicFields(formFields[formData.contractType] || {});
    } else {
      setDynamicFields({});
    }
  }, [formData.contractType]);

  const inputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const dynamicFieldChange = (e) => {
    setDynamicFields((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIspending(true);

    let dynamicFieldDetails = "";
    for (const key in dynamicFields) {
      dynamicFieldDetails += `${key}: ${dynamicFields[key]}\n`;
    }

    const prompt = `Create a ${formData.contractType} between ${formData.recievingParty} and ${formData.otherParty}, starting from ${formData.startDate} to ${formData.endDate}. Additional details:\n${dynamicFieldDetails}`;

    const response = await fetch(`https://privy-proof-api.onrender.com/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIspending(false);
      alert(json);
    }

    if (response.ok) {
      setIspending(false);
      setData(json.data.content);
      setPreview(true);
    }
  };

  return (
    <div>
      <h1 className="mb-[17px] text-lg font-semibold leading-default text-black">
        Contract Draft
      </h1>
      <div className="flex h-full justify-center bg-secondaryColor pb-[31px] pt-[41px]">
        <form className="pb-[31px] flex h-fit w-full flex-col pl-[39px] pr-[48px]" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-x-[120px]">
            <div className="flex flex-col gap-y-6">
              <h2 className="mb-[21px] text-center text-base font-bold leading-default text-black">
                Contract Details
              </h2>
              <div>
                <label className="text-base font-semibold leading-default text-black">
                  Name of Receiving Party
                </label>
                <input
                  type="text"
                  name="recievingParty"
                  value={formData.recievingParty}
                  onChange={inputChange}
                  placeholder="Enter name of 1st party"
                  className="mt-[8px] w-full rounded-[10px] border-[0.5px] border-solid border-[#c4c4c4] bg-white px-[16px] py-[14px]"
                />
              </div>
              <div>
                <label className="text-base font-semibold leading-default text-black">
                  Name of Other Party
                </label>
                <input
                  type="text"
                  name="otherParty"
                  value={formData.otherParty}
                  onChange={inputChange}
                  placeholder="Enter name of 2nd party"
                  className="mt-[8px] w-full rounded-[10px] border-[0.5px] border-solid border-[#c4c4c4] bg-white px-[16px] py-[14px]"
                />
              </div>
              <div>
                <label className="text-base font-semibold leading-default text-black">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={inputChange}
                  className="mt-[8px] w-full rounded-[10px] border-[0.5px] border-solid border-[#c4c4c4] bg-white px-[16px] py-[14px]"
                />
              </div>
              <div>
                <label className="text-base font-semibold leading-default text-black">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={inputChange}
                  className="mt-[8px] w-full rounded-[10px] border-[0.5px] border-solid border-[#c4c4c4] bg-white px-[16px] py-[14px]"
                />
              </div>
              <div>
                <label className="text-base font-semibold leading-default text-black">
                  Type of Contract
                </label>
                <select
                  name="contractType"
                  value={formData.contractType}
                  onChange={inputChange}
                  className="mt-[8px] w-full rounded-[10px] border-[0.5px] border-solid border-[#c4c4c4] bg-white px-[16px] py-[14px]"
                >
                  <option value="">Select one</option>
                  {Object.keys(formFields).map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-y-6">
              <h2 className="mb-[21px] text-center text-base font-bold leading-default text-black">
                Additional Details
              </h2>
              {Object.keys(dynamicFields).map((field) => (
                <div key={field}>
                  <label className="text-base font-semibold leading-default text-black">
                    {field}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={dynamicFields[field]}
                    onChange={dynamicFieldChange}
                    placeholder={`Enter ${field.toLowerCase()}`}
                    className="mt-[8px] w-full rounded-[10px] border-[0.5px] border-solid border-[#c4c4c4] bg-white px-[16px] py-[14px]"
                  />
                </div>
              ))}
            </div>
          </div>

          <button className="mt-9 w-[483px] self-center rounded-full bg-primaryColor py-3 text-center text-base font-semibold leading-default text-black">
            Preview
          </button>
          {isPending && <Spinner message="Preparing Contract..." />}
        </form>
      </div>
      {preview && data && <ContractModal contract={data} />}
    </div>
  );
}

export default ContractDraft;
