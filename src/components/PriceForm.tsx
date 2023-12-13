interface PriceForm {
  value: string;
  setValue: any;
}

export function PriceForm({ value, setValue }: PriceForm) {
  function RegexNumber(value: string) {
    return value
      .replace(/\D/g, "")
      .replace(/[.,]/g, "")
  }

  return (
    <div data-aos="zoom-in" className="flex flex-col gap-3">
      <div className='w-full flex items-end justify-between gap-1'>
        <span className='text-primary text-5xl font-semibold pb-3'>
          R$
        </span>
        <p className='text-primary text-8xl p-0 m-0 w-full font-medium '>
          {value}
        </p>
      </div>
      <input
        className='w-full bg-primary'
        type="range"
        min="1000"
        max="5000"
        step="100"
        value={value}
        id="slider"
        onChange={e => setValue(e.target.value)}
      />
      <p className="text-center text-zinc-400 text-xs">
        * Selecione o valor do empréstimo
      </p>
    </div>
  )
}