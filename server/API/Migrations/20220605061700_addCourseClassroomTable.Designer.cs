﻿// <auto-generated />
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace API.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20220605061700_addCourseClassroomTable")]
    partial class addCourseClassroomTable
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("API.Models.DatabaseModels.Course", b =>
                {
                    b.Property<string>("CourseId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("Credits")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("requiredCourseId")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("CourseId");

                    b.ToTable("Courses");
                });

            modelBuilder.Entity("API.Models.DatabaseModels.CourseClassroom", b =>
                {
                    b.Property<string>("CourseClassId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("CourseId")
                        .HasColumnType("int");

                    b.Property<string>("CourseId1")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Schedule")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TeacherName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("CourseClassId");

                    b.HasIndex("CourseId1");

                    b.ToTable("CourseClassroom");
                });

            modelBuilder.Entity("API.Models.DatabaseModels.CourseEducationProgram", b =>
                {
                    b.Property<string>("CourseId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("EducationalProgramId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("CourseId", "EducationalProgramId");

                    b.HasIndex("EducationalProgramId");

                    b.ToTable("CourseEducationProgram");
                });

            modelBuilder.Entity("API.Models.DatabaseModels.EducationalProgram", b =>
                {
                    b.Property<string>("EducationalProgramId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("EducationalProgramId");

                    b.ToTable("EducationalProgram");
                });

            modelBuilder.Entity("API.Models.DatabaseModels.CourseClassroom", b =>
                {
                    b.HasOne("API.Models.DatabaseModels.Course", "Course")
                        .WithMany()
                        .HasForeignKey("CourseId1");

                    b.Navigation("Course");
                });

            modelBuilder.Entity("API.Models.DatabaseModels.CourseEducationProgram", b =>
                {
                    b.HasOne("API.Models.DatabaseModels.Course", "Course")
                        .WithMany()
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Models.DatabaseModels.EducationalProgram", "EducationalProgram")
                        .WithMany()
                        .HasForeignKey("EducationalProgramId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Course");

                    b.Navigation("EducationalProgram");
                });
#pragma warning restore 612, 618
        }
    }
}