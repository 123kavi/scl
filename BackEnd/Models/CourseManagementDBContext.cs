using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace CourseManagementAPI.Models
{
    public partial class CourseManagementDBContext : DbContext
    {
        public CourseManagementDBContext()
        {
        }

        public CourseManagementDBContext(DbContextOptions<CourseManagementDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Course> Courses { get; set; }
        public virtual DbSet<Student> Students { get; set; }
        public virtual DbSet<Alocate> Alocates { get; set; }
        public virtual DbSet<Subject> Subjects { get; set; }
        public virtual DbSet<ClassRoom> ClassRooms { get; set; }

        public virtual DbSet<Teacher> Teachers { get; set; }
        public virtual DbSet<Take> Takes { get; set; }
        public IEnumerable<object> Allocate { get; internal set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Course>(entity =>
            {
                entity.ToTable("Course");             
                entity.Property(e => e.DeptIdFk).HasColumnName("deptId_fk");

                entity.HasOne(d => d.DeptIdFkNavigation)
                    .WithMany(p => p.Courses)
                    .HasForeignKey(d => d.DeptIdFk)
                    .HasConstraintName("deptId_fk");
                
                entity.HasOne(d => d.TeacherIdFkNavigation)
               .WithMany(p => p.Courses)
               .HasForeignKey(d => d.TeacherIdFk)
               .HasConstraintName("studentId_fk");

            });

            modelBuilder.Entity<Alocate>(entity =>
            {
                entity.ToTable("Alocates");




                entity.Property(e => e.ClassIdFk).HasColumnName("classId_fk");

                entity.HasOne(d => d.ClassIdFkNavigation)
                    .WithMany(p => p.Alocates)
                    .HasForeignKey(d => d.ClassIdFk)
                    .HasConstraintName("classId_fk");

                entity.HasOne(d => d.TeacherIdFkNavigation)
               .WithMany(p => p.Alocates)
               .HasForeignKey(d => d.TeacherIdFk)
               .HasConstraintName("studentId_fk");



            });

           modelBuilder.Entity<Student>(entity =>
            {
              

 entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("firstName");

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("lastName");
  entity.Property(e => e.ContactPerson)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("ContactPerson");



                   entity.Property(e => e.ContactNo)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("ContactNo");

                   
                      entity.Property(e => e.EmailAddress)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("EmailAddress");




  
                      entity.Property(e => e.DOB)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("DOB");

          
                      entity.Property(e => e.Age)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Age");








            });









            modelBuilder.Entity<Subject>(entity =>
            {
                entity.ToTable("Subject");

                entity.Property(e => e.SubjectName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("SubjectName");
            });


           modelBuilder.Entity<ClassRoom>(entity =>
            {
                entity.ToTable("ClassRoom");
                
                entity.Property(e => e.CLassName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("ClassName");
            });



            modelBuilder.Entity<Teacher>(entity =>
            {
                entity.ToTable("Teacher");

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("firstName");

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("lastName");



                   entity.Property(e => e.ContactNo)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("ContactNo");

                   
                      entity.Property(e => e.EmailAddress)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("EmailAddress");

            });


            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
