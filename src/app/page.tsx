"use client";

//react
import { useEffect, useState } from 'react';

//next.js
import Link from 'next/link';

//components
import { CalculateLoan } from '@/components/CalculateLoanForm';
import { PriceForm } from '@/components/PriceForm';
import { Button } from '@/components/Button';

//hooks
import { useForm } from '@/hooks/useForm';

//AOS 
import AOS from 'aos';
import 'aos/dist/aos.css';


interface UseFormProps {
  steps: JSX.Element[];
}

const paymentMethods = [
  { name: 'Selecionar forma de pagamento' },
  { name: 'Diário 24x (Segunda a Sábado)' },
  { name: 'Diário 20x (Segunda a Sexta)' },
  { name: 'Semanal 4x' },
  { name: 'Quinzenal 2x' },
  { name: 'Mensal 1x' },
]

export default function Home() {
  const [value, setValue] = useState("500");
  const [selected, setSelected] = useState(paymentMethods[0]);
  const [result, setResult] = useState("");
  const [method, setMethod] = useState("");

  function currencyBRL(value: number) {
    return value.toLocaleString('pt-BR', {
      style: "currency",
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
  }

  function handleCalculateLoan() {
    let total = parseFloat(value);

    switch (selected.name) {
      case 'Diário 24x (Segunda a Sábado)':
        total *= 1.2;
        total /= 24;
        setResult(`Você pagará 24 parcelas de ${currencyBRL(total)}`)
        setMethod(`Diário 24x de de ${currencyBRL(total)}`);
        break;
      case 'Diário 20x (Segunda a Sexta)':
        total *= 1.2;
        total /= 20;
        setResult(`Você pagará 20 parcelas de ${currencyBRL(total)}`);
        setMethod(`Diário 20x de de ${currencyBRL(total)}`);
        break;
      case 'Semanal 4x':
        total *= 1.2;
        total /= 4;
        setResult(`Você pagará 4 parcelas de ${currencyBRL(total)}`);
        setMethod(`Semanal 4x de ${currencyBRL(total)}`);
        break;
      case 'Quinzenal 2x':
        total *= 1.2;
        total /= 2;
        setResult(`Você pagará 2 parcelas de ${currencyBRL(total)}`);
        setMethod(`Quinzenal 2x de ${currencyBRL(total)}`);
        break;
      case 'Mensal 1x':
        total *= 1.2;
        total /= 1;
        setResult(`Você pagará 1 parcela de ${currencyBRL(total)}`);
        setMethod(`Mensal 1x de ${currencyBRL(total)}`);
        break;
      default:
        setResult("");
        break;
    }
  }

  const formComponents = [
    <PriceForm
      value={value}
      setValue={setValue}
    />,
    <CalculateLoan
      selected={selected}
      setSelected={setSelected}
      listPaymentMthods={paymentMethods}
      result={result}
      handleCalculateLoan={handleCalculateLoan}
    />,
  ];

  const formProps: UseFormProps = {
    steps: formComponents
  };

  const {
    currentComponent,
    currentStep,
    changeStep,
    isFirstStep,
    isSecondStep,
    isLastStep
  } = useForm(formProps);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    setResult("");
  }, [value, selected]);

  return (
    <main className='bg-zinc-100 w-full h-screen flex justify-center items-center flex-col gap-8 p-4'>
      <h1 className='text-3xl font-medium text-zinc-600'>
        Calculadora de Empréstimos
      </h1>
      <div className='w-full max-w-[640px] h-full max-h-[480px] bg-white rounded-lg shadow-lg p-8 flex flex-col justify-between items-center'>
        {isFirstStep && (
          <p
            data-aos="zoom-in"
            className='text-zinc-950 text-lg font-semibold self-start'
          >
            De quanto está precisando?
          </p>
        )}
        {isSecondStep && (
          <p
            data-aos="zoom-in"
            className='text-zinc-950 text-lg font-semibold self-start'
          >
            Valor do empréstimo: {currencyBRL(Number(value))} <br />
            Estamos quase lá!
          </p>
        )}
        <form
          onSubmit={(event) => changeStep(currentStep + 1, event)}
          className='flex justify-between items-center flex-col gap-6 w-full h-full'
        >
          <div></div>
          <div>{currentComponent}</div>
          <div className='w-full flex items-center justify-center flex-col gap-2'>
            {isSecondStep || isLastStep && (
              <Button
                type="button"
                title="Voltar"
                variant="gray"
                onClick={() => changeStep(currentStep - 1)}
              />
            )}
            {isFirstStep && (
              <Button type="submit" title="Continuar" />
            )}
            {isSecondStep && (
              <div className='flex w-full max-w-[300px] gap-2'>
                <Button
                  type="button"
                  title="Voltar"
                  variant="gray"
                  onClick={() => changeStep(currentStep - 1)}
                />
                <Link
                  className="w-full"
                  target="_blank"
                  href={`https://api.whatsapp.com/send/?phone=5548991149389&text=Tenho interesse em um empréstimo de ${currencyBRL(Number(value))}. Forma de pagamento: ${method}`}
                >
                  <Button
                    type="button"
                    disabled={result !== "" ? false : true}
                    icon={true}
                    title="Enviar"
                  />
                </Link>
              </div>
            )}
            {currentStep == 1 &&
              <span className='text-primary'>
                * Enviar para o WhatsApp
              </span>
            }
          </div>
        </form>
      </div>
    </main>
  )
}
