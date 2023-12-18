import { Dispatch, SetStateAction } from "react";
import { Modal } from "./Modal";
import { Select } from "./Select";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { useState } from 'react';
import { Calender } from "./Calender";

interface CalculateLoanProps {
  selectedPayment: any;
  setSelectedPayment: any;
  selectedPercentage: any;
  setSelectedPercentage: any;
  listPaymentMthods: any;
  listPercentage: any;
  selectedDate: any;
  handleDateChange?: any
  resultOption1: string[];
  resultOption2: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  copyCheck: boolean;
  setCopyCheck: Dispatch<SetStateAction<boolean>>;
  copyCheck2: boolean;
  setCopyCheck2: Dispatch<SetStateAction<boolean>>;
  copyResult: (option: number) => void;
}

export function CalculateLoan({
  selectedPayment,
  setSelectedPayment,
  selectedPercentage,
  setSelectedPercentage,
  selectedDate,
  handleDateChange,
  listPaymentMthods,
  listPercentage,
  resultOption1,
  resultOption2,
  isOpen,
  setIsOpen,
  copyCheck,
  setCopyCheck,
  copyCheck2,
  setCopyCheck2,
  copyResult,
}: CalculateLoanProps) {
  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <>
      <div
        data-aos="zoom-in"
        className=" w-full h-full my-4"
      >
        <fieldset className="disabled:opacity-20 flex flex-col gap-1 w-full mb-6">
          <label className="text-zinc-400 text-[12px]">
            * Selecione a data de início para o pagamento do empréstimo
          </label>
          <Calender value={selectedDate} onChange={handleDateChange} placeholder="dd/mm/aaaa" />
        </fieldset >
        <fieldset className="flex flex-col gap-1 w-full mb-6">
          <label className="text-zinc-400 text-[12px]">
            * Selecione a porcentagem de juros
          </label>
          <Select
            selected={selectedPercentage}
            setSelected={setSelectedPercentage}
            paymentMethods={listPercentage}
          />
        </fieldset>
        <fieldset className="flex flex-col gap-1 w-full mb-2">
          <label className="text-zinc-400 text-[12px]">
            * Selecione uma forma de pagamento
          </label>
          <Select
            selected={selectedPayment}
            setSelected={setSelectedPayment}
            paymentMethods={listPaymentMthods}
          />
        </fieldset>
      </div>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        result1={resultOption1}
        result2={resultOption2}
        copyCheck={copyCheck}
        copyCheck2={copyCheck2}
        setCopyCheck2={setCopyCheck2}
        copyResult={copyResult}
      />
    </>
  )
}