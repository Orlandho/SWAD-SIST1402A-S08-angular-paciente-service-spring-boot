package com.upn.clinica.config;

import com.upn.clinica.model.Paciente;
import com.upn.clinica.repository.PacienteRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final PacienteRepository pacienteRepository;

    public DataInitializer(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }

    @Override
    public void run(String... args) {
        if (pacienteRepository.count() == 0) {
            pacienteRepository.save(new Paciente("Pérez Quispe Juan Carlos", 45, "72345678", "Crisis hipertensiva aguda", true, "Critico", "2026-10-10", "987654321"));
            pacienteRepository.save(new Paciente("Gómez Soto Ana María", 28, "45678901", "Cefalea migrañosa recurrente", true, "Medio", "2026-10-10", "912345678"));
            pacienteRepository.save(new Paciente("Torres Vega Luis Alberto", 62, "08765432", "Dolor torácico opresivo", true, "Critico", "2026-10-10", "955443322"));
            pacienteRepository.save(new Paciente("Mendoza Ruiz Carmen", 19, "71239845", "Contusión leve en tobillo derecho", true, "Bajo", "2026-10-10", "944332211"));
        }
    }
}
