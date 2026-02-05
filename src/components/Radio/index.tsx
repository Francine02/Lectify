import { RadioProps } from './RadioProps';

export function Radio({ value, text, checked, onChange }: RadioProps) {
  return (
    <div className="flex my-2 sm:my-0">
      <input
        checked={checked}
        onChange={onChange}
        name="format"
        value={value}
        type="radio"
        className="shrink-0 mt-0.5 border-gray-200 rounded-full text-purple-600 focus:ring-purple-500 checked:border-purple-500 cursor-pointer"
        id={value}
      />
      <label className="ml-2 font-medium cursor-pointer text-sm" form={value}>
        {text}
      </label>
    </div>
  );
}
