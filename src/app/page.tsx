"use client";

//react
import { FormEvent, useEffect, useState } from 'react';

//components
import { CalculateLoan } from '@/components/CalculateLoanForm';
import { PriceForm } from '@/components/PriceForm';
import { Button } from '@/components/Button';

//hooks
import { useForm } from '@/hooks/useForm';

//AOS 
import AOS from 'aos';
import 'aos/dist/aos.css';
import { toast } from 'react-toastify';


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

const interestPercentage = [
  { name: 'Selecionar porcentagem' },
  { name: '20%' },
  { name: '30%' },
]

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("5000");

  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0]);
  const [selectedPercentage, setSelectedPercentage] = useState(interestPercentage[0]);
  const [selectedDate, setSelectedDate] = useState("");

  const [resultOption1, setResultOption1] = useState<string[]>([]);
  const [resultOption2, setResultOption2] = useState("");

  const [copyCheck, setCopyCheck] = useState(false);
  const [copyCheck2, setCopyCheck2] = useState(false);

  function currencyBRL(value: number) {
    return value.toLocaleString('pt-BR', {
      style: "currency",
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
  }

  function generatePaymentSchedule(
    total: number,
    numberOfInstallments: number,
    startDate: string
  ) {
    const paymentSchedule = [];
    let currentDate = new Date(startDate);
    let currentWeek = 1;
    let separatorAdded = false;

    for (let i = 1; i <= numberOfInstallments;) {
      const dayOfWeek = currentDate.getDay();
      let currentWeekStartDate = new Date(startDate);
      const formattedDate = currentDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

      if (selectedPayment.name == "Diário 24x (Segunda a Sábado)" || selectedPayment.name == "Diário 20x (Segunda a Sexta)") {
        if (!separatorAdded) {
          paymentSchedule.push(`---- Semana ${currentWeek} ----`);
          separatorAdded = true;
        }
      }

      if (selectedPayment.name === "Semanal 4x") {
        if (dayOfWeek === 1 || dayOfWeek === 0) {
          paymentSchedule.push(`---- Semana ${currentWeek} ----`);
          currentWeekStartDate.setDate(currentWeekStartDate.getDate() + 7);
          currentWeek++;
        }
      }

      if (selectedPayment.name !== "Diário 24x (Segunda a Sábado)") {
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          paymentSchedule.push(`📆 ${formattedDate} 💰${currencyBRL(total)}`);
          i++;
        }
      }

      if (selectedPayment.name === "Diário 24x (Segunda a Sábado)") {
        if (dayOfWeek !== 0) {
          paymentSchedule.push(`📆 ${formattedDate} 💰${currencyBRL(total)}`);
          i++;
        }
      }

      if (numberOfInstallments === 24 || numberOfInstallments === 20) {
        currentDate.setDate(currentDate.getDate() + 1);
      }

      if (numberOfInstallments === 4) {
        currentDate.setDate(currentDate.getDate() + 7);
      }

      if (numberOfInstallments === 2) {
        currentDate.setDate(currentDate.getDate() + 15);
      }

      if (numberOfInstallments === 1) {
        let selectedDate = new Date(currentDate);

        selectedDate.setMonth(selectedDate.getMonth() + 1);

        let novoMes = selectedDate.getMonth() + 1;
        let dataFormatada = novoMes < 10 ? `${selectedDate.getDate()}/0${novoMes}` : `${selectedDate.getDate()}/${novoMes}`;
        paymentSchedule[0] = (`📆 ${dataFormatada} 💰${currencyBRL(total)}`);
      }

      if (dayOfWeek === 0 && separatorAdded) {
        currentWeek++;
        separatorAdded = false;
      }
    }
    setResultOption1(paymentSchedule);

  }

  function handleCalculateLoan() {
    let total = parseFloat(value);

    switch (selectedPayment.name) {
      case 'Diário 24x (Segunda a Sábado)':
        selectedPercentage.name == "20%" ? total *= 1.2 : total *= 1.3
        total /= 24;
        generatePaymentSchedule(total, 24, selectedDate)
        setResultOption2(`Diário 24x de ${currencyBRL(total)} (Pagamento de segunda a sábado)`);
        break;
      case 'Diário 20x (Segunda a Sexta)':
        selectedPercentage.name == "20%" ? total *= 1.2 : total *= 1.3
        total /= 20;
        generatePaymentSchedule(total, 20, selectedDate)
        setResultOption2(`Diário 20x de ${currencyBRL(total)} (Pagamento de segunda a sexta)`);
        break;
      case 'Semanal 4x':
        selectedPercentage.name == "20%" ? total *= 1.2 : total *= 1.3
        total /= 4;
        generatePaymentSchedule(total, 4, selectedDate)
        setResultOption2(`Semanal 4x de ${currencyBRL(total)}`);
        break;
      case 'Quinzenal 2x':
        selectedPercentage.name == "20%" ? total *= 1.2 : total *= 1.3
        total /= 2;
        generatePaymentSchedule(total, 2, selectedDate)
        setResultOption2(`Quinzenal 2x de ${currencyBRL(total)}`);
        break;
      case 'Mensal 1x':
        selectedPercentage.name == "20%" ? total *= 1.2 : total *= 1.3
        total /= 1;
        generatePaymentSchedule(total, 1, selectedDate)
        setResultOption2(`Mensal 1x de ${currencyBRL(total)}`);
        break;
      default:
        setResultOption1([]);
        setResultOption2("");
        break;
    }
  };

  function gerenateListPayments() {
    setIsOpen(true);
    handleCalculateLoan();
  }

  // input date
  function handleDateChange(event: any) {
    setSelectedDate(event.target.value);

    /*if (selectedPayment.name === "Diário 24x (Segunda a Sábado)") {
      if (selected.getDay() === 0) {
        alert(`Não é possível selecionar os domingos nesta forma de pagamento: ${selectedPayment.name}`)
        setSelectedDate("");
      } else {
        setSelectedDate(event.target.value);
      }
    }
    if (selectedPayment.name !== "Diário 24x (Segunda a Sábado)") {
      if (selected.getDay() === 0 || selected.getDay() === 6) {
        alert(`Não é possível selecionar finais de semana nesta forma de pagamento: ${selectedPayment.name}`)
        setSelectedDate("");
      } else {
        setSelectedDate(event.target.value);
      }
    }*/
  };

  // copy cronograma
  function copyResult(option: number) {
    if (option === 1) {
      const resultsText = resultOption1.join('\n');
      const textarea = document.createElement('textarea');
      textarea.value = resultsText;

      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      setCopyCheck(true);
      setCopyCheck2(false);

      toast.success("Cronograma completo copiado com sucesso!");
    }

    if (option === 2) {
      const resultsText = resultOption2;
      const textarea = document.createElement('textarea');
      textarea.value = resultsText;

      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      setCopyCheck2(true);
      setCopyCheck(false);

      toast.success("Cronograma resumido copiado com sucesso!");
    }
  }

  // form step
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    changeStep(currentStep + 1, event);
  }

  const formComponents = [
    <PriceForm
      value={value}
      setValue={setValue}
    />,
    <CalculateLoan
      selectedPayment={selectedPayment}
      setSelectedPayment={setSelectedPayment}
      selectedPercentage={selectedPercentage}
      setSelectedPercentage={setSelectedPercentage}
      selectedDate={selectedDate}
      listPaymentMthods={paymentMethods}
      listPercentage={interestPercentage}
      handleDateChange={handleDateChange}
      resultOption1={resultOption1}
      resultOption2={resultOption2}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      copyCheck={copyCheck}
      setCopyCheck={setCopyCheck}
      copyCheck2={copyCheck2}
      setCopyCheck2={setCopyCheck2}
      copyResult={copyResult}
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
  // form step

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    setResultOption1([]);
    setResultOption2("");
    setCopyCheck(false);
    setCopyCheck2(false);

  }, [
    value,
    selectedPayment,
    selectedPercentage,
    selectedDate
  ]);

  return (
    <main className='bg-zinc-100 w-full h-screen flex justify-center items-center flex-col gap-5 p-4'>
      <h1 className='text-[26px] font-medium text-zinc-600'>
        Calculadora de Empréstimos
      </h1>
      <div data-aos="zoom-in" className='w-full max-w-[660px] min-h-[540px] bg-white rounded-lg shadow-lg p-8 flex flex-col justify-between items-center'>
        {isFirstStep && (
          <p
            data-aos="zoom-in"
            className='text-zinc-950 text-lg font-semibold self-start'
          >
            Informe o valor do empréstimo
          </p>
        )}
        {isSecondStep && (
          <p
            data-aos="zoom-in"
            className='text-zinc-950 text-lg font-semibold self-start'
          >
            Valor do empréstimo: {currencyBRL(Number(value))} <br />
          </p>
        )}
        <form
          onSubmit={handleSubmit}
          className='flex justify-between items-center flex-col gap-6 w-full h-full'
        >
          <div></div>
          <div className='w-full max-w-[320px]'>{currentComponent}</div>
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
              <div className='flex flex-col w-full max-w-[320px] gap-2'>
                <div className="flex flex-col gap-1 items-center">
                  <Button
                    title="Gerar cronograma de pagamentos"
                    type="button"
                    disabled={selectedPayment.name == "Selecionar forma de pagamento"
                      || selectedPercentage.name == "Selecionar porcentagem"
                      || selectedDate == ""
                      ? true : false}
                    onClick={gerenateListPayments}
                  />
                  <label className="text-zinc-400 text-[12px]">
                    * Conferir cronograma de pagamentos do empréstimo
                  </label>
                </div>
                <Button
                  type="button"
                  title="Voltar"
                  variant="gray"
                  onClick={() => changeStep(currentStep - 1)}
                />
              </div>
            )}
          </div>
        </form>
      </div>
    </main>
  )
}
