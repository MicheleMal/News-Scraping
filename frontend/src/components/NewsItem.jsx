import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Chip,
    Button,
} from "@mui/material";
import { CalendarDays } from "lucide-react";

export default function Component({
    id,
    title,
    summary,
    date,
    link,
    image,
    category,
}) {
    return (
        <Card
            sx={{
                width: "100%", // Prende tutta la larghezza del contenitore
                maxWidth: { xs: "100%", sm: 400, md: 450 }, // Massima larghezza in base allo schermo
                margin: "auto",
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: "#1e1e1e", // Colore di sfondo scuro
                color: "#ffffff", // Colore del testo chiaro
            }}
        >
            {/* Immagine */}
            <CardMedia
                component="img"
                image={image}
                alt="Immagine notizia"
                sx={{
                    width: "100%",
                    height: "auto",
                    aspectRatio: "16/9",
                    objectFit: "cover",
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    transition: "transform 0.3s ease",
                    "&:hover": {
                        transform: "scale(1.05)",
                    },
                }}
            />

            {/* Contenuto */}
            <CardContent>
                <Chip
                    label={category}
                    sx={{
                        mb: 1,
                        fontSize: 12,
                        color: "#ffffff",
                        backgroundColor: "#374150",
                    }}
                />
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold", color: "#ffffff" }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="body2"
                    color="#b0b0b0"
                    sx={{ mt: 1, mb: 1 }}
                >
                    {summary}
                </Typography>
                <Typography
                    variant="caption"
                    color="#b0b0b0"
                    sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                    <CalendarDays size={20} color="#b0b0b0" strokeWidth={1.5} />
                    {new Date(date).toLocaleString()}
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        mt: 2,
                        backgroundColor: "#ffffff",
                        color: "#1e1e1e",
                        "&:hover": {
                            backgroundColor: "#d2d6d3",
                        },
                    }}
                    fullWidth
                    onClick={() => window.open(link, "_blank")}
                >
                    Leggi di più
                </Button>
            </CardContent>
        </Card>
    );
}
