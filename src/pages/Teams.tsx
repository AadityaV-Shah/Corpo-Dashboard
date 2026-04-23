import type { FC, SVGProps } from 'react'
import { Container, Grid } from "@chakra-ui/react";
import {
    Terminal,
    Layout,
    Coffee,
    Server,
    Smartphone,
    Database,
    ShieldCheck,
    Search,
    Layers
} from 'lucide-react';
import MarketCard from "../components/MarketCard";

interface TeamsProps {
    iconic?: FC<SVGProps<SVGSVGElement>>;
    title?: string,
    team?: string,
}

const teamData: TeamsProps[] = [
    { iconic: Terminal, title: 'DevOps', team: '5 members' },
    { iconic: Layout, title: 'Frontend', team: '9 members' },
    { iconic: Coffee, title: 'Java', team: '9 members' },
    { iconic: Server, title: 'Node.js', team: '8 members' },
    { iconic: Smartphone, title: 'Mobile App', team: '6 members' },
    { iconic: Database, title: 'Data Science', team: '4 members' },
    { iconic: ShieldCheck, title: 'Cybersecurity', team: '3 members' },
    { iconic: Search, title: 'QA & Testing', team: '7 members' },
    { iconic: Layers, title: 'UI/UX Design', team: '4 members' },
];

const Teams = () => {
    return (
        <Container mt={"80px"} mb={"40px"}>
            <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
                gap={6}
            >
                {teamData.map((item) => (
                    <MarketCard
                        iconic={item.iconic}
                        title={item.title}
                        detail={item.team}
                        bgimage={"url('/designMentor2.webp')"}
                        boxsize={"40px"}
                        showButton={false}
                    />
                ))}
            </Grid>
        </Container>
    );
};

export default Teams