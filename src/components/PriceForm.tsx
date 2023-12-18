interface PriceForm {
  value: string;
  setValue: any;
}

export function PriceForm({ value, setValue }: PriceForm) {
  return (
    <div data-aos="zoom-in" className="flex flex-col gap-3">
      <div className='w-full flex items-end mb-[-20px]'>
        <span className='text-primary text-4xl font-semibold pb-6'>
          R$
        </span>
        <p className='text-primary text-[88px] p-0 m-0 w-full font-medium '>
          {value}
        </p>
      </div>
      <input
        className='w-full bg-primary'
        type="range"
        min="100"
        max="10000"
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