import { QuestionRequest } from "@/schema/request.schema";
import { QuestionType } from "@prisma/client";
import { ChangeEvent, useEffect, useRef, useState } from "react";

const types: QuestionType[] = ["CHECKBOX", "MULTIPLE_CHOICE", "TEXT"];

const QuestionInput = ({
  order,
  passUp,
}: {
  order: number;
  passUp: (question: QuestionRequest) => void;
}) => {
  const [question, setQuestion] = useState<QuestionRequest>({
    content: "",
    options: [],
    order,
    required: false,
    type: "CHECKBOX",
  });
  const currentType = question.type;
  const options = question.options;
  const optionInputRef = useRef<HTMLInputElement>(null);

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setQuestion({
      ...question,
      type: e.target.value as QuestionType,
    });
    // setCurrentType(e.target.value as QuestionType);
  };

  const removeOption = (index: number) => {
    const target = options.filter((_, i) => index != i);
    setQuestion({
      ...question,
      options: target,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log("hi");
      if (optionInputRef.current) {
        setQuestion({
          ...question,
          options: [
            ...question.options,
            { content: optionInputRef.current.value, remove: false },
          ],
        });
        // setOptions([...options, optionInputRef.current.value]);
        optionInputRef.current.value = "";
      }
    }
  };

  useEffect(() => {
    passUp(question);
  }, [question]);

  useEffect(() => {
    if (currentType === "TEXT") {
      setQuestion({
        ...question,
        options: [],
      });
    }
  }, [currentType]);

  return (
    <div className="w-full">
      <div className="w-full flex items-center ">
        <input
          type="text"
          placeholder="Question Name"
          required
          onChange={(e) => {
            setQuestion({
              ...question,
              content: e.target.value,
            });
          }}
          className="flex-grow p-2  border-b outline-none focus:border-b-blue-500 "
        />
        <select
          className="min-w-fit"
          defaultValue={currentType}
          onChange={handleTypeChange}
        >
          {types.map((type, index) => {
            return (
              <option key={index} value={type}>
                {type}
              </option>
            );
          })}
        </select>
        <div className="ms-2">
          <input
            type="checkbox"
            checked={question.required}
            onChange={(e) =>
              setQuestion({
                ...question,
                required: e.target.checked,
              })
            }
            name="required"
          />{" "}
          Required
        </div>
      </div>
      <div>
        {options.map((option, index) => {
          return (
            <div className="flex my-2" key={index}>
              <input
                type={currentType === "CHECKBOX" ? "checkbox" : "radio"}
                disabled
              />
              <span className="flex-grow ms-2">{option.content}</span>
              <span
                className="ms-2 hover:cursor-pointer"
                onClick={() => removeOption(index)}
              >
                X
              </span>
            </div>
          );
        })}
        {currentType !== "TEXT" ? (
          <div className="my-2 flex">
            <input
              type={currentType === "CHECKBOX" ? "checkbox" : "radio"}
              disabled
            />{" "}
            <input
              className="outline-none ms-2 border-b flex-grow focus:border-b-blue-500"
              onKeyDown={handleKeyDown}
              ref={optionInputRef}
              type="text"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default QuestionInput;
