import { BorderBeam } from "../magicui/border-beam";

export function Border() {
    return (
        <>
            <BorderBeam
                duration={6}
                size={250}
                className="from-transparent via-rosa to-transparent "
            />
            <BorderBeam
                duration={6}
                delay={3}
                size={250}
                className="from-transparent via-[#fbb258] to-transparent"
            />
        </>
    );
}
