import React from 'react';
import { Grid, Card, CardMedia, Typography, Box } from '@mui/material';

interface Company {
    id: number;
    name: string;
    logo_path: string | null;
}

interface ProductionCompaniesProps {
    companies?: Company[];
}

const ProductionCompanies: React.FC<ProductionCompaniesProps> = ({ companies = [] }) => (
    <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
            Production Companies
        </Typography>
        <Grid container spacing={2}>
            {companies.length > 0 ? (
                companies.map((company) => (
                    <Grid item xs={6} md={3} key={company.id}>
                        <Card elevation={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            {company.logo_path ? (
                                <CardMedia
                                    component="img"
                                    image={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                                    alt={company.name}
                                    sx={{ height: 120, objectFit: 'contain' }}
                                />
                            ) : (
                                <Typography variant="body2" color="textSecondary" sx={{ height: 120, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    {company.name}
                                </Typography>
                            )}
                        </Card>
                    </Grid>
                ))
            ) : (
                <Typography variant="body2" color="textSecondary">No production companies available</Typography>
            )}
        </Grid>
    </Box>
);

export default ProductionCompanies;
