import {useForm, SubmitHandler} from 'react-hook-form';

type NewAddress = {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  userId: string;
};

const sampleUserId = 'sampleUserId123';

export default function NewAddressForm() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<NewAddress>();

  const onSubmit: SubmitHandler<NewAddress> = (data) => {
    data.userId = sampleUserId; // Assign sample user ID
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-1">
      <label
        htmlFor="street"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Street
        <input
          id="street"
          {...register('street', {required: true})}
          placeholder="Street"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        />
        {errors.street && <span>Street is required</span>}
      </label>

      <label
        htmlFor="city"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        City
        <input
          id="city"
          {...register('city', {required: true})}
          placeholder="City"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        />
        {errors.city && <span>City is required</span>}
      </label>

      <fieldset className="flex flex-row gap-5">
        <label
          htmlFor="state"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Province
          <select
            id="state"
            {...register('state', {required: true})}
            name="Province"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
            <option value="">Select Province</option>
            <option value="AB">Alberta</option>
            <option value="BC">British Columbia</option>
            <option value="MB">Manitoba</option>
            <option value="NB">New Brunswick</option>
            <option value="NL">Newfoundland and Labrador</option>
            <option value="NS">Nova Scotia</option>
            <option value="ON">Ontario</option>
            <option value="PE">Prince Edward Island</option>
            <option value="QC">Quebec</option>
            <option value="SK">Saskatchewan</option>
          </select>
          {errors.state && <span>Province is required</span>}
        </label>

        <label
          htmlFor="country"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Country
          <input
            id="country"
            {...register('country', {required: true})}
            placeholder="Country"
            defaultValue="Canada"
            disabled
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          />
          {errors.country && <span>Country is required</span>}
        </label>
      </fieldset>

      <label
        htmlFor="zipCode"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Postal Code
        <input
          id="zipCode"
          {...register('zipCode', {
            required: true,
            pattern: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
          })}
          placeholder="Postal Code"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        />
        {errors.zipCode && (
          <span>
            Postal Code is required and must match the format A1A 1A1 or A1A1A1
          </span>
        )}
      </label>

      <button
        type="submit"
        className='w-full mt-4 text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"'>
        Save
      </button>
    </form>
  );
}
