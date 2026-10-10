package com.upn.clinica.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "paciente")
public class Paciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(min = 3, max = 150)
    @Column(nullable = false, length = 150)
    private String nombre;

    @NotNull(message = "La edad es obligatoria")
    @Column(nullable = false)
    private Integer edad;

    @NotBlank(message = "El DNI es obligatorio")
    @Pattern(regexp = "^[0-9]{8}$", message = "El DNI debe tener 8 dígitos numéricos")
    @Column(nullable = false, length = 8)
    private String dni;

    @NotBlank(message = "El diagnóstico es obligatorio")
    @Column(nullable = false, length = 255)
    private String diagnostico;

    @Column(nullable = false)
    private Boolean activo = true;

    @NotBlank(message = "El nivel de triaje es obligatorio")
    @Column(nullable = false, length = 20)
    private String triaje; // 'Bajo' | 'Medio' | 'Critico'

    @Column(name = "fecha_ingreso", nullable = false, length = 30)
    private String fechaIngreso;

    @Column(length = 20)
    private String telefono;

    public Paciente() {
    }

    public Paciente(Long id, String nombre, Integer edad, String dni, String diagnostico, Boolean activo, String triaje, String fechaIngreso, String telefono) {
        this.id = id;
        this.nombre = nombre;
        this.edad = edad;
        this.dni = dni;
        this.diagnostico = diagnostico;
        this.activo = activo;
        this.triaje = triaje;
        this.fechaIngreso = fechaIngreso;
        this.telefono = telefono;
    }

    public Paciente(String nombre, Integer edad, String dni, String diagnostico, Boolean activo, String triaje, String fechaIngreso, String telefono) {
        this.nombre = nombre;
        this.edad = edad;
        this.dni = dni;
        this.diagnostico = diagnostico;
        this.activo = activo;
        this.triaje = triaje;
        this.fechaIngreso = fechaIngreso;
        this.telefono = telefono;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getEdad() {
        return edad;
    }

    public void setEdad(Integer edad) {
        this.edad = edad;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getDiagnostico() {
        return diagnostico;
    }

    public void setDiagnostico(String diagnostico) {
        this.diagnostico = diagnostico;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }

    public String getTriaje() {
        return triaje;
    }

    public void setTriaje(String triaje) {
        this.triaje = triaje;
    }

    public String getFechaIngreso() {
        return fechaIngreso;
    }

    public void setFechaIngreso(String fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
}
