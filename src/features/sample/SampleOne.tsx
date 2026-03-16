import {
    useAppDispatch,
    useAppSelector,
} from 'src/globals/store/redux/reduxHooks'
import { sampleAction } from 'src/features/sample/sampleReducer'

export function SampleOne() {
    const value = useAppSelector((state) => state.sampleReducer.value)
    const dispatch = useAppDispatch()

    return (
        <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-4">
            <p className="mb-2 text-sm text-blue-700">샘플 버전 1 (증감)</p>
            <p className="mb-2 font-medium">값: {value}</p>
            <div className="flex gap-2">
                <button
                    type="button"
                    className="rounded bg-blue-500 px-3 py-1 text-white"
                    onClick={() => dispatch(sampleAction.increment())}
                >
                    +1
                </button>
                <button
                    type="button"
                    className="rounded bg-gray-500 px-3 py-1 text-white"
                    onClick={() => dispatch(sampleAction.decrement())}
                >
                    -1
                </button>
            </div>
        </div>
    )
}
