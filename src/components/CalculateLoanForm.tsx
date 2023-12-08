import { Button } from "./Button";
import { Select } from "./Select";

interface CalculateLoanProps {
  selected: any;
  setSelected: any;
  listPaymentMthods: any;
  result: string;
  handleCalculateLoan: () => void;
}

export function CalculateLoan({
  selected,
  setSelected,
  listPaymentMthods,
  result,
  handleCalculateLoan
}: CalculateLoanProps) {

  return (
    <div
      data-aos="zoom-in"
      className=" w-full h-full"
    >
      <div className="flex flex-col gap-1 w-[320px] mb-2">
        <label className="text-zinc-400 text-[12px]">
          * Escolha uma forma de pagamento para continuar
        </label>
        <Select
          selected={selected}
          setSelected={setSelected}
          paymentMethods={listPaymentMthods}
        />
      </div>
      {selected.name == "Selecionar forma de pagamento"
        ? <></>
        : <Button
          data-aos="zoom-in"
          title="Calcular"
          type="button"
          disabled={selected.name == "Selecionar forma de pagamento" ? true : false}
          onClick={handleCalculateLoan}
        />
      }
      {result &&
        <div
          data-aos="zoom-in"
          className="shadow-inner p-4 w-full mt-3 rounded-lg"
        >
          {result}
        </div>
      }
    </div>
  )
}