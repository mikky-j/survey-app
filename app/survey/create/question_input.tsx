import { QuestionType } from "@prisma/client";
import { type } from "os";
import { ChangeEvent, useEffect, useState } from "react";

const types: QuestionType[] = ["CHECKBOX", "MULTIPLE_CHOICE", "TEXT"];

const QuestionInput = () => {
  const [currentType, setCurrentType] = useState<QuestionType>("CHECKBOX");
  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentType(e.target.value as QuestionType);
  };

  useEffect(() => {});
  return (
    <div className="w-full">
      <div className="w-full flex items-center ">
        <input
          type="text"
          placeholder="Question Name"
          className="w-4/5 p-2  border-b outline-none focus:border-b-blue-500 "
        />
        <select
          className="w-1/5"
          defaultValue={currentType}
          onChange={handleTypeChange}
        >
          {types.map((type) => {
            return <option value={type}>{type}</option>;
          })}
        </select>
      </div>
    </div>
  );
};

export default QuestionInput;
