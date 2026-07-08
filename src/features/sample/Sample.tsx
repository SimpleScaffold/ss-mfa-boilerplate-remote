import {
    useAppDispatch,
    useAppSelector,
} from 'src/globals/store/redux/reduxHooks'
import { sampleAction } from 'src/features/sample/sampleReducer'
import { SampleComponent } from './components/SampleComponent'

export function Sample() {
    const value = useAppSelector((state) => state.sampleReducer.value)
    const dispatch = useAppDispatch()

    return (
        <div className="rounded-lg border p-4">
            <p className="mb-2">Sample value: {value}</p>
            <div className="flex gap-2">
                <button
                    type="button"
                    className="cursor-pointer rounded bg-blue-500 px-3 py-1 text-white"
                    onClick={() => dispatch(sampleAction.increment())}
                >
                    +1
                </button>
                <SampleComponent />
                <button
                    type="button"
                    className="cursor-pointer rounded bg-gray-500 px-3 py-1 text-white"
                    onClick={() => dispatch(sampleAction.decrement())}
                >
                    -1
                </button>
            </div>
        </div>
    )
}
