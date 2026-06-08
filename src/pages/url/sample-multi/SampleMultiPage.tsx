import { SampleOne } from 'src/features/sample/SampleOne'
import { SampleTwo } from 'src/features/sample/SampleTwo'

type SampleMultiPageProps = { modalId?: string }

const SampleMultiPage = ({
    modalId = 'sample-multi1',
}: SampleMultiPageProps) => {
    return (
        <>
            {modalId === 'sample-multi1' && (
                <div className="p-6">
                    <SampleOne />
                </div>
            )}
            {modalId === 'sample-multi2' && (
                <div className="p-6">
                    <SampleTwo />
                </div>
            )}
        </>
    )
}

export default SampleMultiPage
