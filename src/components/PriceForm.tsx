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
    <div data-aos="zoom-in" className="w-full max-w-[320px]">
      <div className='flex items-end justify-between gap-1'>
        <span className='text-primary text-5xl font-semibold pb-5'>
          R$
        </span>
        <input
          className='text-primary text-8xl p-0 m-0 w-full font-medium '
          type="text"
          placeholder={value}
          value={`${value}`}
          onChange={e => setValue(RegexNumber(e.target.value))}
        />
      </div>
      <input
        className='w-full bg-primary '
        type="range"
        min="100"
        max="1000"
        step="50"
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