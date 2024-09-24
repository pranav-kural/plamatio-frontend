import {useAddUserAddressMutation} from '@/app/lib/api/users-slice';
import {FC, useMemo} from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import {LoadingSpinner} from '../ui/LoadingSpinner';
import {Logger} from '@/app/utils/logger/Logger';
import {dispatchUserEvent} from '@/app/lib/kafka/dispatch/user-events';

// logger
const logger = new Logger({context: 'NewAddressForm'});

type NewAddress = {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  userId: string;
};

type NewAddressFormProps = {
  userId: string;
  onSubmitSuccess: () => void;
};

export const NewAddressForm: FC<NewAddressFormProps> = ({
  userId,
  onSubmitSuccess,
}) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<NewAddress>({});

  const [addAddress, {isError, error, isLoading, isSuccess}] =
    useAddUserAddressMutation();

  // Log error if any occurs during adding address to database
  useMemo(() => {
    if (isError) {
      logger.error(
        `${Date.now()} NewAddressForm: Error adding address for user ${userId}`,
        JSON.stringify(error)
      );
    }
  }, [isError, error, userId]);

  const onSubmit: SubmitHandler<NewAddress> = (data) => {
    logger.debug(
      `NewAddressForm: Submitting new address for user ${userId}`,
      JSON.stringify(data)
    );
    // confirm user ID available
    if (!userId) {
      throw new Error('NewAddressForm: User ID is required');
    }
    addAddress({
      ...data,
      userId,
    });
    reset();
  };

  const onSubmitError = (error: unknown) => {
    logger.error(
      `${Date.now()} NewAddressForm: Error adding address for user ${userId}`,
      JSON.stringify(error)
    );
  };

  // if address is added successfully, call onSubmitSuccess
  useMemo(() => {
    if (isSuccess) {
      // dispatch user event when address is added
      dispatchUserEvent({
        user_id: userId,
        event_type: 'address_added',
        core_component: 'new_address_form',
        description: `User added new address`,
      });
      onSubmitSuccess();
    }
  }, [isSuccess, onSubmitSuccess, userId]);

  return (
    <>
      {isLoading && (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <LoadingSpinner label="Loading products..." />
        </div>
      )}

      {!isLoading && (
        <form
          onSubmit={handleSubmit(onSubmit, onSubmitError)}
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
                {...register('country', {value: 'Canada'})}
                placeholder="Country"
                defaultValue="Canada"
                value="Canada"
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
                Postal Code is required and must match the format A1A 1A1 or
                A1A1A1
              </span>
            )}
          </label>

          <button
            type="submit"
            className='w-full mt-4 text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"'>
            Save
          </button>
        </form>
      )}
    </>
  );
};

export default NewAddressForm;
